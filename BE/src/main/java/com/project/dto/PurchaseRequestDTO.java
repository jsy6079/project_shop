package com.project.dto;

import java.time.LocalDateTime;

import com.project.entity.Money;
import com.project.entity.OrderHistory;
import com.project.entity.Product;
import com.project.entity.TransactionsList;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseRequestDTO {

	// 구매 이력 테이블
	// 구매 이력 ID
	private Long orderHistoryId; 
	// 등록일
	private LocalDateTime orderHistoryTime;
	// 상품 ID (이건 상품 테이블에서 필요하겠지)
	private Long productId;
	// 거래 상태 (이건 상품 테이블에서 필요하겠지)
	private String productStatus;
	// 구매자 이메일 (이건 유저 테이블에서 필요하겠지)
	private String buyerEmail;
	
	private String productName;

	
	// 거래 테이블
	// 거래 ID
	private Long transactionId;
	// 등록일
	private LocalDateTime transactionTime;
	// 수취인
	private String transactionName;
	// 전화번호
	private String transactionPhone;
	// 주소
	private String transactionAddress;
	// 상태
	private String transactionStatus;
	// 판매자 이메일(이건 상품 테이블에서 필요)
	private String sellerEmail;
	// 상품 ID (이건 상품 테이블에서 필요)
	// 구매자 이메일(이건 유저 테이블에서 필요)
	private Long  buyerMoney;
	private int productPrice;	

}
