package com.project.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.project.dto.ReviewDTO;

public interface AdminReviewService {

	// 검토가 필요한 리뷰 리스트 가져오기
	Page<ReviewDTO> findReviewConfirm(Pageable pageable);

	// 리뷰 삭제 요청 승인
	void reviewRequestDeletePermit(Long review_id);

	// 리뷰 삭제 요청 반려
	void reviewRequestDeleteReject(Long review_id);

}
