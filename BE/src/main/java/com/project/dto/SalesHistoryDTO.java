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
		
	    String transactionStatusSeller = salesHistory.getTransactionsList() != null
	            ? salesHistory.getTransactionsList().getTransactionStatusSeller()
	            : "판매중"; // 거래요청 전이므로 판매중으로 간주
	    
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
