package com.project.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.AdminLoginDTO;
import com.project.entity.AdminUser;
import com.project.jwt.JwtUtil;
import com.project.repository.AdminUserRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminUserLoginController {
	
	private final AdminUserRepository ar;
	private final PasswordEncoder passwordEncoder;
	private final JwtUtil ju;
	
	
	// 관리자 로그인
	@PostMapping("/login")
	public ResponseEntity<String> adminUserLogin(@RequestBody AdminLoginDTO adminLoginDTO, HttpServletResponse response){
		AdminUser adminUser = ar.findByAdminUserEmail(adminLoginDTO.getAdminUserEmail());
		
	    if (adminUser == null) {
	        return ResponseEntity
	            .status(HttpStatus.UNAUTHORIZED)
	            .body("아이디 또는 비밀번호가 일치하지 않습니다.");
	    }
		
		if(!passwordEncoder.matches(adminLoginDTO.getAdminUserPassword(), adminUser.getAdminUserPassword()) || !adminLoginDTO.getAdminUserEmail().equals(adminUser.getAdminUserEmail())) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호가 일치하지 않습니다.");
		}
		
		String token = ju.createToken(adminUser.getAdminUserEmail(), "ADMIN");
		
       
        Cookie cookie = new Cookie("admin_token", token);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60); // 1시간
        response.addCookie(cookie);
		
		return ResponseEntity.ok("로그인 되었습니다.");
	}

	
	// 관리자 쿠키 검증
	@GetMapping("/check")
	public ResponseEntity<?> checkAdmin(
	    @CookieValue(name = "admin_token", required = false) String token
	) {
	    if (token == null) { 
	    	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401
	    }

	    String role = ju.extractAllClaims(token).get("role", String.class);
	    if (!"ADMIN".equals(role)) {
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 403
	    }

	    return ResponseEntity.ok().build();
	}

}
