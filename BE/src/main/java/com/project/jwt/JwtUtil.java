package com.project.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

	// JWT 시크릿 값
    @Value("${spring.jwt.secret}")
    private String secretKey;

    // 첫 발급 엑세스 토큰 만료 시간
    @Value("${spring.jwt.expiration}") 
    private long expirationTime;
    
    // 첫 발급 리프레시 토큰 만료 시간
    @Value("${spring.jwt.refresh-expiration}") 
    private long refreshExpirationTime;
    
    // 리프레시를 통한 엑세스 토큰 만료 시간
    @Value("${spring.jwt.refresh-issued-expiration}")
    private long expiration = 30000; 


    
    // Secret Key를 HMAC SHA-256 키로 변환
    private SecretKey getSigningKey() { 
        byte[] keyBytes = Decoders.BASE64.decode(secretKey); 
        return Keys.hmacShaKeyFor(keyBytes);
    }

    
    // JWT 생성 (사용자 이메일을 기반으로 생성)
    public String generateToken(String email, String username, String imgUrl, String phone, String address, Long money, Long score) {
        return Jwts.builder()
        		.claim("name", username)
        		.claim("imgUrl", imgUrl)
        		.claim("phone", phone)
        		.claim("address", address)
        		.claim("money", money)
        		.claim("score", score)
                .subject(email) 
                .issuedAt(new Date()) 
                .expiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(getSigningKey()) 
                .compact();
    }
    
	// 어드민 유저 JWT 생성
	public String createToken(String adminUserEmail, String adminName, String role) {
		return Jwts.builder()
				.claim("email", adminUserEmail)
				.claim("name", adminName)
				.claim("role", role)
				.subject(adminUserEmail) 
				.issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis() + expirationTime))
				.signWith(getSigningKey()) 
				.compact();
	}
	
    
    // 리프레시를 통한 엑세스 토큰 생성 (사용자 이메일을 기반으로 생성)
    public String generateRefreshToken(String email, String username, String imgUrl, String phone, String address, Long money, Long score) {
        return Jwts.builder()
        		.claim("name", username)
        		.claim("imgUrl", imgUrl)
        		.claim("phone", phone)
        		.claim("address", address)
        		.claim("money", money)
        		.claim("score", score)
                .subject(email) 
                .issuedAt(new Date()) 
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey()) 
                .compact();
    }

    
 // JWT 검증 및 사용자 정보 반환
    public String validateToken(String token) {
        try {
            return Jwts.parser() 
                    .verifyWith(getSigningKey()) 
                    .build()
                    .parseSignedClaims(token) 
                    .getPayload()
                    .getSubject(); 
        } catch (ExpiredJwtException e) {
            System.out.println("토큰이 만료되었습니다.");
            return null;  
        } catch (JwtException e) {
            System.out.println("유효하지 않은 토큰입니다.");
            return null;  
        }
    }


    // 토큰 추출
    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

    }
    
    // 리프레시 토큰 발급 메서드
    public String getRefreshToken(String email) {
    	
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + refreshExpirationTime))
                .signWith(getSigningKey())
                .compact();
    }

    // 이메일 값
	public String extractEmail(String token) {
		return extractAllClaims(token).getSubject();
	}


	// 유저이름 값
	public String extractUsername(String token) {
		return extractAllClaims(token).get("name", String.class);
	}


	// 유저 프로필 사진 값
	public String extractImgUrl(String token) {
		return extractAllClaims(token).get("imgUrl", String.class);
	}


	// 유저 전화번호 값
	public String extractPhone(String token) {
		return extractAllClaims(token).get("phone", String.class);
	}


	// 유저 주소 값
	public String extractAddress(String token) {
		return extractAllClaims(token).get("address", String.class);
	}


	// 유저 마일리지 값
	public Long extractMoney(String token) {
		return extractAllClaims(token).get("money", Long.class);
	}


	// 유저 등급 점수 값
	public Long extractScore(String token) {
		return extractAllClaims(token).get("score", Long.class);
	}






	



}
