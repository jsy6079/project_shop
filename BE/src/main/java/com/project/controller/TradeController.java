package com.project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.service.TradeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class TradeController {
	
	private final TradeService ts;
	
	
	// 진행중인 거래(판매자) 요청 수락
	@PutMapping("/accept/{transactionId}")
	public ResponseEntity<String> getTradeAccept(@PathVariable (name = "transactionId") Long transactionId){
		String response = ts.getTradeAccept(transactionId);
		
		return ResponseEntity.ok(response);
	}
	
	// 진행중인 거래(구매자) 취소
	@PutMapping("/cancel/{transactionId}")
	public ResponseEntity<String> getTradeCancel(@PathVariable (name = "transactionId")Long transactionId){
		
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		
		String response = ts.getTradeCancel(email,transactionId);
		
		return ResponseEntity.ok(response);
	}
	

}
