package com.project.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.project.entity.User;
import com.project.jwt.JwtUtil;
import com.project.service.UserService;

import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth/login")
@RequiredArgsConstructor
public class UserController {
	
//	private final JwtUtil jwtUtil;
	private final UserService us;
	

    @GetMapping("/kakao")
    public void kakaoLogin(OAuth2AuthenticationToken authenticationToken, HttpServletResponse response) throws IOException {
    	
    	ResponseEntity<Map<String,String>> tokenResponse = us.kakaoLogin(authenticationToken);
    	String jwtToken = tokenResponse.getBody().get("token");
    	
    	if(jwtToken == null) {
    		System.out.println("토큰이 존재하지 않습니다.");
    	}
    	
    	Cookie cookie = new Cookie("token", jwtToken);
    	
    	cookie.setHttpOnly(false);
    	cookie.setSecure(false);
    	cookie.setPath("/"); 
    	cookie.setMaxAge(60);
    	response.addCookie(cookie);
    	
    	System.out.println("토큰 발급 완료");
    	
    	response.sendRedirect("http://localhost:3000");
    	
        
    }
	

}
