package com.project.dto;

import java.time.LocalDateTime;

import com.project.entity.TransactionsList;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionsListDTO {
	
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
	private String transactionStatusBuyer;
	private String transactionStatusSeller;
	// 판매자 이메일(이건 상품 테이블에서 필요)
	private String sellerEmail;
	// 상품 ID (이건 상품 테이블에서 필요)
	private Long productId;
	// 구매자 이메일(이건 유저 테이블에서 필요)
	private String buyerEmail;
	private Long  buyerMoney;
	private int productPrice;
	private String productName;
	private Long categoryId;
	
	// 거래 이력 테이블
	public static TransactionsListDTO fromEntity(TransactionsList transactionsList) {
		return new TransactionsListDTO(

			    transactionsList.getTransactionId(), 
			    transactionsList.getTransactionTime(), 
			    transactionsList.getTransactionName(),
			    transactionsList.getTransactionPhone(), 
			    transactionsList.getTransactionAddress(), 
			    transactionsList.getTransactionStatusBuyer(), 
			    transactionsList.getTransactionStatusSeller(),
			    transactionsList.getSeller().getUserEmail(),   
			    transactionsList.getProduct().getProduct_id(), 
			    transactionsList.getBuyer().getUserEmail(),  
			    transactionsList.getBuyer().getUser_money(), 
			    transactionsList.getProduct().getProduct_price(), 
			    transactionsList.getProduct().getProduct_name(),
			    transactionsList.getProduct().getCategory().getCategory_id()
			);

	}
}
