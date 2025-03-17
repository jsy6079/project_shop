package com.project.controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.project.entity.User;
import com.project.jwt.JwtUtil;
import com.project.repository.UserRepository;
import com.project.service.LoginService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth/login")
@RequiredArgsConstructor
public class LoginController {
	
	private final JwtUtil ju;
	private final LoginService us;
	private final UserRepository ur;
	

	// 카카오 로그인 + JWT
    @GetMapping("/kakao")
    public void kakaoLogin(OAuth2AuthenticationToken authenticationToken, HttpServletResponse response) throws IOException {
    	
    	ResponseEntity<Map<String,String>> tokenResponse = us.kakaoLogin(authenticationToken);
    	String jwtToken = tokenResponse.getBody().get("token");
    	String accessToken = tokenResponse.getBody().get("accessToken");
    	
    	if(jwtToken == null || accessToken == null) {
    		System.out.println("토큰이 존재하지 않습니다.");
    	}
    	
    	Cookie cookie = new Cookie("token", jwtToken);
    	
    	cookie.setHttpOnly(true);
    	cookie.setSecure(false);
    	cookie.setPath("/"); 
    	cookie.setMaxAge(60 * 60); // 쿠키 만료 시간
    	response.addCookie(cookie);
    	
        Cookie accessTokenCookie = new Cookie("accessToken", accessToken);
        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setSecure(false); 
        accessTokenCookie.setPath("/");
        accessTokenCookie.setMaxAge(60 * 60); // 엑세스 만료 시간
        response.addCookie(accessTokenCookie);
    	
    	System.out.println("토큰 발급 완료");
    	
    	response.sendRedirect("http://localhost:3000");
    	
        
    }
    
    
    @GetMapping("/userinfo")
    public ResponseEntity<?> getUserInfo(HttpServletRequest request) {
        String token = getTokenFromCookies(request);

        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT 토큰이 존재하지 않습니다.");
        }

        String email = ju.extractEmail(token);
        String username = ju.extractUsername(token);
        String imgUrl = ju.extractImgUrl(token);

        // DB 조회 추가
        User user = ur.findByUserEmail(email)
                      .orElseThrow(() -> new IllegalArgumentException("사용자 정보 없음"));

        return ResponseEntity.ok(Map.of(
            "email", email,
            "username", username,
            "imgUrl", imgUrl,
            "money", user.getUser_money(),
            "score", user.getUser_reviewScore(),
            "address", user.getUser_address(),
            "phone", user.getUser_phone()
        ));
    }

    // HttpOnly 쿠키에서 JWT 토큰 읽기
    private String getTokenFromCookies(HttpServletRequest request) {
        if (request.getCookies() == null) return null;

        return Arrays.stream(request.getCookies())
                .filter(cookie -> "token".equals(cookie.getName()))
                .findFirst()
                .map(Cookie::getValue)
                .orElse(null);
    }
    
    
    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@CookieValue(name = "token", required = false) String token,
                                    @CookieValue(name = "accessToken", required = false) String accessToken,
                                    HttpServletResponse response) {
        if (token == null) {
            System.out.println("JWT 토큰이 존재하지 않습니다");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT 토큰이 존재하지 않습니다.");
        }

        // 1. 카카오 로그아웃 요청
        ResponseEntity<Map<String, String>> kakaoResponse = us.kakaoLogout(accessToken);

        if (!kakaoResponse.getStatusCode().is2xxSuccessful()) {
            return kakaoResponse; // 카카오 로그아웃 실패 시 반환
        }

        // JWT 쿠키 삭제 (로그아웃)
        Cookie jwtCookie = new Cookie("token", null);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(false);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(0);
        response.addCookie(jwtCookie);

        return ResponseEntity.ok(Map.of("message", "로그아웃 성공"));
    }

}
