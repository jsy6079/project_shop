package com.project.dto;

import java.time.LocalDateTime;

import com.project.entity.SalesHistory;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SalesHistoryDTO {
	
	private Long salesHistoryId; 
	private LocalDateTime salesHistoryTime;
	private Long productId;
	private String productName;
	private String transactionStatusSeller;
	private String sellerEmail;
	private Long categoryId;
	
	// 판매 이력 테이블
	public static SalesHistoryDTO fromEntity(SalesHistory salesHistory) {
	
	  String transactionStatusSeller;

	    if (salesHistory.getTransactionsList() != null) {
	        // 거래가 있으면 거래 상태 그대로
	        transactionStatusSeller = salesHistory.getTransactionsList().getTransactionStatusSeller();
	    } else {
	        // 거래가 없으면 product 상태 참고
	        String productStatus = salesHistory.getProduct().getProduct_status();

	        if ("판매자삭제".equals(productStatus)) {
	            transactionStatusSeller = "판매자삭제";
	        } else {
	            transactionStatusSeller = "판매중";
	        }
	    }
	    
		return new SalesHistoryDTO(
				salesHistory.getSalesHistoryId(),
				salesHistory.getSalesHistoryTime(),
				salesHistory.getProduct().getProduct_id(), 
				salesHistory.getProduct().getProduct_name(),
				transactionStatusSeller,
				salesHistory.getUser().getUserEmail(),
				salesHistory.getProduct().getCategory().getCategory_id()
			);

	}

}
