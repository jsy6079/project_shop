package com.project.service;

public interface TradeService {

	// 진행중인 거래(판매자) 요청 수락
	String getTradeAccept(Long transactionId);

	// 진행중인 거래(구매자) 취소
	String getTradeCancel(String email, Long transactionId);

}
