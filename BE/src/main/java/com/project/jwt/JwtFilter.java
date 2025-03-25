package com.project.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import com.project.repository.UserRepository;

import jakarta.servlet.http.Cookie;

import java.io.IOException;

@Component
public class JwtFilter extends GenericFilterBean {

    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UserRepository userRepository; 

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        jakarta.servlet.http.HttpServletResponse httpResponse = (jakarta.servlet.http.HttpServletResponse) response;
        String token = null;

        // 쿠키에서 토큰 찾기
        if (httpRequest.getCookies() != null) {
            for (Cookie cookie : httpRequest.getCookies()) {
                if ("token".equals(cookie.getName())) { // 쿠키 이름
                    token = cookie.getValue();
                    break;
                }
            }
        }
        
        // 토큰 유효성 검사 및 시큐리티 컨텍스트에 등록
        if (token != null) {
            String email = jwtUtil.validateToken(token); 

            if (email != null) {
            	boolean userExists = userRepository.findByUserEmail(email).isPresent();
            	
            	if (userExists) {
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(email, null, null);
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpRequest));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            	} else {
                    // 유저 없으면 쿠키 무효화 + 401
                    invalidateCookie(httpResponse, "token");
                    httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "유저 정보가 존재하지 않습니다.");
                    return;
                
            	}
            }
        }

        chain.doFilter(request, response);
    }
    
	    private void invalidateCookie(jakarta.servlet.http.HttpServletResponse response, String cookieName) {
	        Cookie cookie = new Cookie(cookieName, null);
	        cookie.setMaxAge(0);
	        cookie.setPath("/");
	        cookie.setHttpOnly(true);
	        response.addCookie(cookie);
	    }
}