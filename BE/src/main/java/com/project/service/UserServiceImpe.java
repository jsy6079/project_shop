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

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpe implements UserService {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final OAuth2AuthorizedClientService authorizedClientRepository;
    private final RestTemplate restTemplate;


    // 카카오 로그인 처리
    @Override
    public ResponseEntity<Map<String, String>> kakaoLogin(OAuth2AuthenticationToken authenticationToken) {
    	
    	System.out.println("Client Registration ID: " + authenticationToken.getAuthorizedClientRegistrationId());
    	System.out.println("Principal Name: " + authenticationToken.getName());
    	
        OAuth2AuthorizedClient authorizedClient = authorizedClientRepository.loadAuthorizedClient(
                authenticationToken.getAuthorizedClientRegistrationId(),
                authenticationToken.getName() 
        );

        if (authorizedClient == null) {
            throw new RuntimeException("카카오 로그인 실패: authorizedClient가 생성되지 않음");
        }

        // Access Token 가져오기
        OAuth2AccessToken accessToken = authorizedClient.getAccessToken();

        // 카카오 API를 사용해 사용자 정보 가져오기
        Map<String, String> userInfo = getKakaoUserInfo(accessToken.getTokenValue());

        // 사용자 정보 저장 또는 업데이트
        User user = saveOrUpdateUser(userInfo.get("email"), userInfo.get("nickname"), userInfo.get("profileImage"));

        // JWT 토큰 발급
        String jwtToken = jwtUtil.generateToken(user.getUser_email(), user.getUser_name(), user.getProfileImg());

        // 응답 생성
        Map<String, String> response = new HashMap<>();
        response.put("token", jwtToken);
        response.put("accessToken", accessToken.getTokenValue());

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
    public User saveOrUpdateUser(String email, String nickname, String profileImage) {
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
                newUser.setUser_email(email);
                newUser.setUser_name(nickname);
                newUser.setProfileImg(profileImage);
                return userRepository.save(newUser);
            });
    }


    // 카카오 로그아웃 처리
	@Override
	  public ResponseEntity<Map<String, String>> kakaoLogout(String accessToken) {
        if (accessToken == null || accessToken.isEmpty()) {
            System.out.println("accessToken이 존재하지 않습니다");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "accessToken이 존재하지 않습니다"));
        }

        // 1. 카카오 로그아웃 API 호출
        String kakaoLogoutUrl = "https://kapi.kakao.com/v1/user/logout";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(kakaoLogoutUrl, HttpMethod.POST, entity, String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            System.out.println("카카오 로그아웃 성공");
            return ResponseEntity.ok(Map.of("message", "카카오 로그아웃 성공"));
        } else {
            System.out.println("카카오 로그아웃 실패: " + response.getBody());
            return ResponseEntity.status(response.getStatusCode())
                    .body(Map.of("error", "카카오 로그아웃 실패"));
        }
    }
}
