package com.project.service;

import org.springframework.http.ResponseEntity;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface JwtLoginService {

	// 사용자 정보 가져오기
	ResponseEntity<?> getUserInfo(HttpServletRequest request, HttpServletResponse response);

	// 로그아웃 (토큰 삭제)
	void logout(String token, String refreshToken, HttpServletResponse response);

}
