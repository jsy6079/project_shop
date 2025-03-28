package com.project.service;

import java.time.Instant;
import java.util.Arrays;
import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.entity.User;
import com.project.jwt.JwtUtil;
import com.project.repository.UserRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtLoginServiceImpe implements JwtLoginService {
	
	// 만료 된 후 리프레시 토큰으로 발급된 엑세스 토큰 쿠키 시간 값 (쿠키)(보류)
    @Value("${spring.jwt.refresh-issued-access-cookie-expiration}")
    private int expiration;

    
	private final JwtUtil ju;
	private final UserRepository ur;

	// 사용자 정보 가져오기 + 만료되면 리프레시 발급
	@Override
	public ResponseEntity<?> getUserInfo(HttpServletRequest request, HttpServletResponse response) {
	    String token = getTokenFromCookies(request);
	    String email;


	    // 액세스 토큰 만료 여부 확인
	    boolean isTokenExpired = checkTokenExpired(token);

	    if (isTokenExpired) {
	        String refreshToken = getRefreshTokenFromCookies(request);
	        if (refreshToken == null) {
	            logoutUser(response);
//	            System.out.println("리프레쉬 종료로 로그아웃");
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("TOKEN_EXPIRED");
	        }

	        // 리프레시 토큰 검증 및 새로운 액세스 토큰 발급
	        email = ju.validateToken(refreshToken);
	        User user = ur.findByUserEmail(email)
	                      .orElseThrow(() -> new IllegalArgumentException("사용자 없음"));

	        // 새로운 액세스 토큰을 기존 token 변수에 저장
	        token = ju.generateRefreshToken(
	            user.getUserEmail(), user.getUser_name(), user.getProfileImg(),
	            user.getUser_phone(), user.getUser_address(), user.getUser_money(), user.getUser_reviewScore()
	        );

	        // 새로운 액세스 토큰을 쿠키에 저장 (쿠키시간) -> 굳이 필요할까 고민중
	        addCookie("token", token, expiration, response);

//	        System.out.println("새로운 액세스 토큰 발급 완료" + token);
	    } else {
	        // 기존 액세스 토큰이 유효하면 그대로 사용
	        email = ju.extractEmail(token);
	    }

	    // 최신 액세스 토큰을 사용하여 사용자 정보 조회
	    User user = ur.findByUserEmail(email)
	                  .orElseThrow(() -> new IllegalArgumentException("사용자 정보 없음"));

	    return ResponseEntity.ok(Map.of(
	        "email", email,
	        "username", user.getUser_name(),
	        "imgUrl", user.getProfileImg(),
	        "money", user.getUser_money(),
	        "score", user.getUser_reviewScore(),
	        "address", user.getUser_address(),
	        "phone", user.getUser_phone()
	    ));
	}


	// 로그아웃 (토큰 삭제)
	@Transactional
	@Override
	public void logout(String token, String refreshToken, HttpServletResponse response) {
		// 로그아웃 (리프레시 토큰 삭제)
        if (refreshToken != null) {
            String email = ju.validateToken(refreshToken);
            if (email != null) {
                ur.findByUserEmail(email)
                              .orElseThrow(() -> new IllegalArgumentException("사용자 없음"));
            }
        }
        // 모든 쿠키 삭제 (완전한 로그아웃)
        deleteCookie("token", response);
        deleteCookie("refreshToken", response);
		
	}
	
	// 액세스 토큰이 만료되었는지 확인하는 메서드 (true = 만료됨, false = 유효함)
	private boolean checkTokenExpired(String token) {
	    if (token == null || token.trim().isEmpty()) {
//	        System.out.println("액세스 토큰 만료 -> 만료로 처리");
	        return true;
	    }

	    try {
	        Claims claims = ju.extractAllClaims(token);
	        Date expiration = claims.getExpiration();  // 만료 시간 추출

	        Instant nowUtc = Instant.now();  
	        Instant expirationUtc = expiration.toInstant();  

//	        System.out.println("현재 시간 (UTC): " + nowUtc);
//	        System.out.println("만료 시간 (UTC): " + expirationUtc);

	        return expirationUtc.isBefore(nowUtc);
	    } catch (ExpiredJwtException e) {
//	        System.out.println("리프레시 엑세스 토큰 만료 -> 재발급");
	        return true; // 토큰이 만료된 것으로 처리
	    } catch (Exception e) {
	        System.out.println("JWT 파싱 중 오류 발생: " + e.getMessage());
	        return true; // 예외 발생 시 안전하게 만료된 것으로 처리
	    }
	}

    
    // JWT 쿠키에서 토큰 읽기
    private String getTokenFromCookies(HttpServletRequest request) {
        if (request.getCookies() == null) return null;

        return Arrays.stream(request.getCookies())
                .filter(cookie -> "token".equals(cookie.getName()))
                .findFirst()
                .map(Cookie::getValue)
                .orElse(null);
    }
    
    
    // 쿠키 삭제 함수
    private void deleteCookie(String name, HttpServletResponse response) {
        Cookie cookie = new Cookie(name, null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }
    
    
    // 자동 로그아웃 메서드 (쿠키 삭제)
    private void logoutUser(HttpServletResponse response) {
        deleteCookie("token", response);
        deleteCookie("refreshToken", response);
    }


	// 리프레시 토큰을 쿠키에서 읽어오는 메소드
    private String getRefreshTokenFromCookies(HttpServletRequest request) {
        if (request.getCookies() == null) return null;

        return Arrays.stream(request.getCookies())
                .filter(cookie -> "refreshToken".equals(cookie.getName()))
                .findFirst()
                .map(Cookie::getValue)
                .orElse(null);
    }

    // 쿠키에 새로운 토큰을 추가하는 메소드
    private void addCookie(String name, String value, int maxAge, HttpServletResponse response) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(maxAge);
        response.addCookie(cookie);
    }


}
