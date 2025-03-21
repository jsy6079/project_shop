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
	private int buyerMoney;
	private int productPrice;
	
	
	
	// 구매 이력 테이블
//	public static PurchaseRequestDTO fromPurchaseEntity(TransactionsList transactionsList) {
//		return new PurchaseRequestDTO(
//				null,
//				null,
//				transactionsList.getProduct().getProduct_id(),
//				null,
//				transactionsList.getUser().getUserEmail(),
//				transactionsList.getTransactionId(),
//				transactionsList.getTransactionTime(),
//				transactionsList.getTransactionName(),
//				transactionsList.getTransactionPhone(),
//				transactionsList.getTransactionAddress(),
//				transactionsList.getTransactionStatus(),
//				transactionsList.getProduct().getUser().getUserEmail(),
//				transactionsList.getUser().getUser_money(),
//				transactionsList.getProduct().getProduct_price()
//				
//		);

}
