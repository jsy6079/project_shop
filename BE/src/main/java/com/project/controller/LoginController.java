package com.project.controller;

import java.io.IOException;
import java.util.Map;


import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

import com.project.service.JwtLoginService;
import com.project.service.KakaoLoginService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth/login")
@RequiredArgsConstructor
public class LoginController {
	
	private final KakaoLoginService ks;
	private final JwtLoginService js;
	
	
	// 엑세스 토큰 + 리프레시 발급
    @GetMapping("/kakao")
    public void kakaoLogin(OAuth2AuthenticationToken authenticationToken, HttpServletResponse response) throws IOException {
    	
    	ResponseEntity<Map<String,String>> tokenResponse = ks.kakaoLogin(authenticationToken);
    	String jwtToken = tokenResponse.getBody().get("token");
    	String refreshToken = tokenResponse.getBody().get("refreshToken");

    	// 엑세스, 리프레시 쿠키로 저장 (쿠키시간)
    	addCookie("token", jwtToken, 60, response);
        addCookie("refreshToken", refreshToken, 180, response); // 1시간

    	System.out.println("토큰 발급 완료");
    	response.sendRedirect("http://localhost:3000");
    }
    
    // 사용자 정보 가져오기
    @GetMapping("/userinfo")
    public ResponseEntity<?> getUserInfo(HttpServletRequest request, HttpServletResponse response) {
    	
    	return js.getUserInfo(request,response);
        
    }
    
	// 로그아웃 (엑세스 + 리플레시 삭제)
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@CookieValue(name = "token", required = false) String token, @CookieValue(name = "refreshToken", required = false) String refreshToken, HttpServletResponse response) {
    	
    	js.logout(token,refreshToken,response);
        
    	return ResponseEntity.ok(Map.of("message", "로그아웃 성공"));
    }
    

    // 쿠키 추가
    private void addCookie(String name, String value, int maxAge, HttpServletResponse response) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(maxAge);
        response.addCookie(cookie);
    }


}
