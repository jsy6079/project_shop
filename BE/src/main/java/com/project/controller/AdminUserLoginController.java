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
import com.project.repository.ProductRepository;
import com.project.repository.UserRepository;
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
	private final ProductRepository pr;
	private final UserRepository ur;
	
	
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
		
		String token = ju.createToken(adminUser.getAdminUserEmail(), adminUser.getAdminName(), "ADMIN");
		
       
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
	
	
	// 관리자 정보 가져오기
	@GetMapping("/adminInfo")
	public ResponseEntity<String> getAdminInfo(@CookieValue(name = "admin_token", required = false) String token){
		
	    if (token == null) { 
	    	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401
	    }
	    
	    String role = ju.extractAllClaims(token).get("role", String.class);
	    if (!"ADMIN".equals(role)) {
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 403
	    }
	    	
	    String adminName = ju.extractAllClaims(token).get("name", String.class);
		
		return ResponseEntity.ok(adminName);
	}
	
	// 등록 된 물품 수 가져오기
	@GetMapping("/product/count")
	public ResponseEntity<Long> getProductCount(@CookieValue(name = "admin_token", required = false) String token){
	    if (token == null) { 
	    	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401
	    }
	    
	    String role = ju.extractAllClaims(token).get("role", String.class);
	    if (!"ADMIN".equals(role)) {
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 403
	    }
	    
	    Long productCount = pr.countPossible();
	    
	    return ResponseEntity.ok(productCount);
	}
	
	// 등록 된 회원 수 가져오기
	@GetMapping("/user/count")
	public ResponseEntity<Long> getUserCount(@CookieValue(name = "admin_token", required = false) String token){
	    if (token == null) { 
	    	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401
	    }
	    
	    String role = ju.extractAllClaims(token).get("role", String.class);
	    if (!"ADMIN".equals(role)) {
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 403
	    }
	    
	    Long userCount = ur.count();
	    
	    return ResponseEntity.ok(userCount);
	}

	
}
