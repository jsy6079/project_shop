package com.project.service;


import java.util.HashMap;
import java.util.Map;

import org.springframework.http.*;
import org.springframework.security.oauth2.client.*;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import com.project.entity.User;
import com.project.jwt.JwtUtil;
import com.project.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class KakaoLoginServiceImpe implements KakaoLoginService {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final OAuth2AuthorizedClientService authorizedClientRepository;
//    private final RefreshTokenRepository refreshTokenRepository;
   
    // 카카오 로그인 처리
    @Override
    public ResponseEntity<Map<String, String>> kakaoLogin(OAuth2AuthenticationToken authenticationToken) {
        OAuth2AuthorizedClient authorizedClient = authorizedClientRepository.loadAuthorizedClient(
                authenticationToken.getAuthorizedClientRegistrationId(),
                authenticationToken.getName()
        );

        if (authorizedClient == null) {
            throw new RuntimeException("카카오 로그인 실패: authorizedClient가 생성되지 않음");
        }

        OAuth2AccessToken accessToken = authorizedClient.getAccessToken();
        Map<String, String> userInfo = getKakaoUserInfo(accessToken.getTokenValue());

        User user = saveOrUpdateUser(userInfo.get("email"),
        	    userInfo.get("nickname"),
        	    userInfo.get("profileImage"),
        	    userInfo.get("phone"),
        	    userInfo.get("address"),
        	    userInfo.get("money") != null ? Long.parseLong(userInfo.get("money")) : 0L,
        	    userInfo.get("score") != null ? Long.parseLong(userInfo.get("score")) : 0L);
        // JWT & Refresh Token 발급
        String jwtToken = jwtUtil.generateToken(user.getUserEmail(),
        	    user.getUser_name(),
        	    user.getProfileImg(),
        	    user.getUser_phone(),
        	    user.getUser_address(),
        	    user.getUser_money(),
        	    user.getUser_reviewScore());
        String refreshToken = jwtUtil.getRefreshToken(user.getUserEmail());

        // DB에 저장
//        RefreshToken tokenEntity = new RefreshToken(user, refreshToken, LocalDateTime.now(), LocalDateTime.now().plusHours(1));
//        refreshTokenRepository.save(tokenEntity);

        // 응답 생성
        Map<String, String> response = new HashMap<>();
        response.put("token", jwtToken);
        response.put("accessToken", accessToken.getTokenValue());
        response.put("refreshToken", refreshToken);

        return ResponseEntity.ok(response);
    }



    // 카카오 사용자 정보 가져오기
    private Map<String, String> getKakaoUserInfo(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> request = new HttpEntity<>(headers);
        ResponseEntity<Map> response = restTemplate.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.GET,
                request,
                Map.class
        );

        Map<String, Object> properties = (Map<String, Object>) response.getBody().get("properties");
        Map<String, Object> kakaoAccount = (Map<String, Object>) response.getBody().get("kakao_account");

        Map<String, String> userInfo = new HashMap<>();
        userInfo.put("email", kakaoAccount.get("email").toString());
        userInfo.put("nickname", properties.get("nickname").toString());
        userInfo.put("profileImage", properties.get("profile_image").toString());

        return userInfo;
    }

    // 사용자 정보 저장 또는 업데이트
    @Override
    public User saveOrUpdateUser(String email, String nickname, String profileImage, String phone, String address, Long money, Long score) {
        return userRepository.findByUserEmail(email)
            .map(user -> {
                // 기존 유저 정보 업데이트
                user.setUser_name(nickname);
                user.setProfileImg(profileImage);
                return userRepository.save(user);
            })
            .orElseGet(() -> {
                // 새 유저 저장
                User newUser = new User();
                newUser.setUserEmail(email);
                newUser.setUser_name(nickname);
                newUser.setProfileImg(profileImage);
                newUser.setUser_phone("정보없음");
                newUser.setUser_address("정보없음");
                newUser.setUser_money(0L);
                newUser.setUser_reviewScore(0L);
                return userRepository.save(newUser);
            });
    }

}
