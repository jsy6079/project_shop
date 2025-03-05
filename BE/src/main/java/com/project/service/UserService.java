package com.project.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;

import com.project.entity.User;

import jakarta.servlet.http.HttpServletRequest;

public interface UserService {
	
	// 사용자 저장 또는 업데이트
	User saveOrUpdateUser(String email, String nickname, String profileImage);

	// 카카오 로그인 + JWT
	ResponseEntity<Map<String, String>> kakaoLogin(OAuth2AuthenticationToken authenticationToken);




	

}
