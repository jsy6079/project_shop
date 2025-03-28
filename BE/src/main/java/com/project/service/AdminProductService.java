package com.project.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.project.dto.TransactionsListDTO;

public interface AdminProductService {

	// 검수 전 진행중인 거래 리스트 가져오기
	Page<TransactionsListDTO> getBeforeInspection(Pageable pageable);

	// 검수 중 진행중인 거래 리스트 가져오기
	Page<TransactionsListDTO> getDuringInspection(Pageable pageable);

	// 검수 완료 진행중인 거래 리스트 가져오기
	Page<TransactionsListDTO> getAfterInspection(Pageable pageable);

	// 검수 시작
	String putStartInspection(Long transactionId);

	// 검수 통과
	String putPassInspection(Long transactionId);

	// 검수 실패
	String putFailInspection(Long transactionId);

	// 검수 성공 후 배송 처리
	String putDeliveryInspection(Long transactionId);

	// 검수 실패 후 반송 처리
	String putReturnInspection(Long transactionId);

}
