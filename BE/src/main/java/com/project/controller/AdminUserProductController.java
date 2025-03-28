package com.project.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.TransactionsListDTO;
import com.project.jwt.JwtUtil;
import com.project.service.AdminProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/product")
public class AdminUserProductController {
	
	private final JwtUtil ju;
	private final AdminProductService aps;
	
	// 검수 전 진행중인 거래 리스트 가져오기
	@GetMapping("/before")
	public ResponseEntity<Page<TransactionsListDTO>> getBeforeInspection(@CookieValue(name = "admin_token", required = false) String token,@RequestParam(name = "page",defaultValue = "0") int page, @RequestParam(name = "size", defaultValue = "5") int size) {
	    if (token == null) { 
	    	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401
	    }
	    
	    String role = ju.extractAllClaims(token).get("role", String.class);
	    if (!"ADMIN".equals(role)) {
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 403
	    }
	    
	    Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "transactionId"));
	    
		Page<TransactionsListDTO> response = aps.getBeforeInspection(pageable);
		return ResponseEntity.ok(response);
	}
	
	// 검수 중 진행중인 거래 리스트 가져오기
	@GetMapping("/during")
	public ResponseEntity<Page<TransactionsListDTO>> getDuringInspection(@CookieValue(name = "admin_token", required = false) String token,@RequestParam(name = "page",defaultValue = "0") int page, @RequestParam(name = "size", defaultValue = "5") int size) {
	    if (token == null) { 
	    	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401
	    }
	    
	    String role = ju.extractAllClaims(token).get("role", String.class);
	    if (!"ADMIN".equals(role)) {
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 403
	    }
	    
	    Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "transactionId"));
	    
		Page<TransactionsListDTO> response = aps.getDuringInspection(pageable);
		return ResponseEntity.ok(response);
	}
	
	
	// 검수 완료 진행중인 거래 리스트 가져오기
	@GetMapping("/after")
	public ResponseEntity<Page<TransactionsListDTO>> getAfterInspection(@CookieValue(name = "admin_token", required = false) String token,@RequestParam(name = "page",defaultValue = "0") int page, @RequestParam(name = "size", defaultValue = "5") int size) {
	    if (token == null) { 
	    	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401
	    }
	    
	    String role = ju.extractAllClaims(token).get("role", String.class);
	    if (!"ADMIN".equals(role)) {
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 403
	    }
	    
	    Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "transactionId"));
	    
		Page<TransactionsListDTO> response = aps.getAfterInspection(pageable);
		return ResponseEntity.ok(response);
	}
	
	// 검수 시작
	@PutMapping("/start/{transactionId}")
	public ResponseEntity<String> putStartInspection(@CookieValue(name = "admin_token", required = false) String token, @PathVariable(name = "transactionId") Long transactionId){
	    if (token == null) { 
	    	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401
	    }
	    
	    String role = ju.extractAllClaims(token).get("role", String.class);
	    if (!"ADMIN".equals(role)) {
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 403
	    }
	    
	    String response = aps.putStartInspection(transactionId);
	    
	    return ResponseEntity.ok(response);
	}
	
	// 검수 통과
	@PutMapping("/pass/{transactionId}")
	public ResponseEntity<String> putPassInspection(@CookieValue(name = "admin_token", required = false) String token, @PathVariable(name = "transactionId") Long transactionId){
	    if (token == null) { 
	    	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401
	    }
	    
	    String role = ju.extractAllClaims(token).get("role", String.class);
	    if (!"ADMIN".equals(role)) {
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 403
	    }
	    
	    String response = aps.putPassInspection(transactionId);
	    
	    return ResponseEntity.ok(response);
	}
	
	// 검수 실패
	@PutMapping("/fail/{transactionId}")
	public ResponseEntity<String> putFailInspection(@CookieValue(name = "admin_token", required = false) String token, @PathVariable(name = "transactionId") Long transactionId){
	    if (token == null) { 
	    	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401
	    }
	    
	    String role = ju.extractAllClaims(token).get("role", String.class);
	    if (!"ADMIN".equals(role)) {
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 403
	    }
	    
	    String response = aps.putFailInspection(transactionId);
	    
	    return ResponseEntity.ok(response);
	}
	
	// 검수 성공 후 배송 처리
	@PutMapping("/delivery/{transactionId}")
	public ResponseEntity<String> putDeliveryInspection(@CookieValue(name = "admin_token", required = false) String token, @PathVariable(name = "transactionId") Long transactionId){
	    if (token == null) { 
	    	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401
	    }
	    
	    String role = ju.extractAllClaims(token).get("role", String.class);
	    if (!"ADMIN".equals(role)) {
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 403
	    }
	    
	    String response = aps.putDeliveryInspection(transactionId);
	    
	    return ResponseEntity.ok(response);
	}
	
	
	// 검수 실패 후 반송 처리
	@PutMapping("/return/{transactionId}")
	public ResponseEntity<String> putReturnInspection(@CookieValue(name = "admin_token", required = false) String token, @PathVariable(name = "transactionId") Long transactionId){
	    if (token == null) { 
	    	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401
	    }
	    
	    String role = ju.extractAllClaims(token).get("role", String.class);
	    if (!"ADMIN".equals(role)) {
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 403
	    }
	    
	    String response = aps.putReturnInspection(transactionId);
	    
	    return ResponseEntity.ok(response);
	}

}
