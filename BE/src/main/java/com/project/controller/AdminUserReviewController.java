package com.project.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.ReviewDTO;
import com.project.jwt.JwtUtil;
import com.project.service.AdminReviewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/review")
public class AdminUserReviewController {
	
	private final JwtUtil ju;
	private final AdminReviewService ars;
	
	// 검토가 필요한 리뷰 리스트 가져오기
	@GetMapping("/confirm")
	public ResponseEntity<Page<ReviewDTO>> getReviewConfirm(@CookieValue(name = "admin_token", required = false) String token,@RequestParam(name = "page",defaultValue = "0") int page, @RequestParam(name = "size", defaultValue = "5") int size){
	    if (token == null) { 
	    	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401
	    }
	    
	    String role = ju.extractAllClaims(token).get("role", String.class);
	    if (!"ADMIN".equals(role)) {
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 403
	    }
	    
	    Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "review_request_delete_time"));
	    
	    Page<ReviewDTO> response = ars.findReviewConfirm(pageable);
	    
	    return ResponseEntity.ok(response);
	}
	
	// 리뷰 삭제 요청 승인
	@PutMapping("/delete/permit/{review_id}")
	public ResponseEntity<?> putReviewRequestDeletePermit(@CookieValue(name = "admin_token", required = false) String token, @PathVariable(name = "review_id") Long review_id){
	    
		if (token == null) { 
	    	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401
	    }
	    
	    String role = ju.extractAllClaims(token).get("role", String.class);
	    if (!"ADMIN".equals(role)) {
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 403
	    }
	    
		ars.reviewRequestDeletePermit(review_id);
		
		return ResponseEntity.ok("리뷰 삭제 요청이 승인되었습니다.");
	}
	

	// 리뷰 삭제 요청 반려
	@PutMapping("/delete/reject/{review_id}")
	public ResponseEntity<?> putReviewRequestDeleteReject(@CookieValue(name = "admin_token", required = false) String token, @PathVariable(name = "review_id") Long review_id){
	    
		if (token == null) { 
	    	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401
	    }
	    
	    String role = ju.extractAllClaims(token).get("role", String.class);
	    if (!"ADMIN".equals(role)) {
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 403
	    }
	    
		ars.reviewRequestDeleteReject(review_id);
		
		return ResponseEntity.ok("리뷰 삭제 요청이 반려되었습니다.");
	}
	


}
