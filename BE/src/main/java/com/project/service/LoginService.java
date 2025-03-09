package com.project.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;

import com.project.entity.User;

import jakarta.servlet.http.HttpServletRequest;

public interface LoginService {
	
	// 사용자 저장 또는 업데이트
	User saveOrUpdateUser(String email, String nickname, String profileImage, String phone, String address, Long money, Long score);

	// 카카오 로그인 + JWT
	ResponseEntity<Map<String, String>> kakaoLogin(OAuth2AuthenticationToken authenticationToken);
	
	// 카카오 로그아웃 + JWT
	ResponseEntity<Map<String, String>> kakaoLogout(String accessToken);



}
