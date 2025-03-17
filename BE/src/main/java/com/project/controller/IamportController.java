package com.project.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.service.IamportService;
import com.project.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class IamportController {
	
	private final IamportService is;
	private final UserService us;
	
	// 결제 요청 + 마일리지 테이블 데이터 추가 + 유저 마일리지 충전
	 @PostMapping("/verify")
	    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> request) {
	        String impUid = request.get("imp_uid");
	        Map<String, Object> body = is.verifyPayment(impUid);

	        if (body != null && body.get("response") != null) {
	            Map<String, Object> paymentData = (Map<String, Object>) body.get("response");

	            // 금액 및 상태 검증
	            if ("paid".equals(paymentData.get("status"))) {
	            	
	    	        String buyerEmail = request.get("buyer_email");
	    	        int money = Integer.parseInt(request.get("paid_amount"));
	    	        
	    	        // 유저 마일리지 충전
	    	        us.addMoney(buyerEmail,money);
	            	     		            	
	                return ResponseEntity.ok("결제 검증 완료");
	            }
	        }

	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("결제 검증 실패");
	    }


}
