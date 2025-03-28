package com.project.dto;

import java.time.LocalDateTime;

import com.project.entity.OrderHistory;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderHistoryDTO {
	
	private Long orderHistoryId; 
	private LocalDateTime orderHistoryTime;
	private Long productId;
	private String productName;
	private String transactionStatusBuyer;
	private String buyerEmail;
	private Long categoryId;
	private String orderHistoryComment;
	
	// 구매 이력 테이블
	public static OrderHistoryDTO fromEntity(OrderHistory orderHistory) {
		return new OrderHistoryDTO(
				orderHistory.getOrderHistoryId(),
				orderHistory.getOrderHistoryTime(),
			    orderHistory.getProduct().getProduct_id(), 
			    orderHistory.getProduct().getProduct_name(),
			    orderHistory.getTransactionsList().getTransactionStatusBuyer(),
			    orderHistory.getUser().getUserEmail(),
			    orderHistory.getProduct().getCategory().getCategory_id(),
			    orderHistory.getOrderHistoryComment()
			);

	}

}
