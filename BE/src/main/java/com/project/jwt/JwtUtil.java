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

    @Value("${spring.jwt.secret}")
    private String secretKey;

    @Value("${spring.jwt.expiration}") 
    private long expirationTime;

    
    // Secret Key를 HMAC SHA-256 키로 변환
    private SecretKey getSigningKey() { 
        byte[] keyBytes = Decoders.BASE64.decode(secretKey); 
        return Keys.hmacShaKeyFor(keyBytes);
    }

    
    // JWT 생성 (사용자 이메일을 기반으로 생성)
    public String generateToken(String email, String username, String imgUrl) {
        return Jwts.builder()
        		.claim("name", username)
        		.claim("imgUrl", imgUrl)
                .subject(email) 
                .issuedAt(new Date()) 
                .expiration(new Date(System.currentTimeMillis() + expirationTime))
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
        } catch (JwtException e) {
            System.out.println("유효하지 않은 토큰입니다.");
        }
        return null;
    }

    // 토큰 추출
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

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
}
