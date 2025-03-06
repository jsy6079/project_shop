package com.project.controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.project.jwt.JwtUtil;
import com.project.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth/login")
@RequiredArgsConstructor
public class UserController {
	
	private final JwtUtil ju;
	private final UserService us;
	

	// 카카오 로그인 + JWT
    @GetMapping("/kakao")
    public void kakaoLogin(OAuth2AuthenticationToken authenticationToken, HttpServletResponse response) throws IOException {
    	
    	ResponseEntity<Map<String,String>> tokenResponse = us.kakaoLogin(authenticationToken);
    	String jwtToken = tokenResponse.getBody().get("token");
    	
    	if(jwtToken == null) {
    		System.out.println("토큰이 존재하지 않습니다.");
    	}
    	
    	Cookie cookie = new Cookie("token", jwtToken);
    	
    	cookie.setHttpOnly(true);
    	cookie.setSecure(false);
//    	cookie.setPath("/"); 
    	cookie.setMaxAge(60);
    	response.addCookie(cookie);
    	
    	System.out.println("토큰 발급 완료");
    	
    	response.sendRedirect("http://localhost:3000");
    	
        
    }
    
    
    // 로그인 후 사용자 정보 가져오기
    @GetMapping("/userinfo")
    public ResponseEntity<?> getUserInfo(HttpServletRequest request) {
        String token = getTokenFromCookies(request);

        if (token == null) {
        	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT 토큰이 존재하지 않습니다.");
           
        }

        String email = ju.extractEmail(token);
        String username = ju.extractUsername(token);
        String imgUrl = ju.extractImgUrl(token);

        return ResponseEntity.ok(Map.of("email", email, "username", username, "imgUrl", imgUrl));
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

	

}
