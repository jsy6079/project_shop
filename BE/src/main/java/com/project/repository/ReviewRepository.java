package com.project.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;

import com.project.dto.ReviewDTO;
import com.project.entity.Product;
import com.project.entity.Review;
import com.project.entity.User;

public interface ReviewRepository extends JpaRepository<Review, Long> {

	// 리뷰 조회 (상세페이지)
	Page<Review> findBySellerAndReviewStatusNot(User seller, String reviewStatus, Pageable pageable);
	
	// 리뷰 조회 (내 정보)
	Page<Review> findBySeller(User seller, Pageable pageable);
	
	// 이미 해당 제품에 리뷰를 했는가
	boolean existsByBuyerAndProduct(User buyer, Product product);

	// 검토가 필요한 리뷰 리스트 가져오기 (관리자용)
	@Query(value = "SELECT * FROM Review WHERE review_request_delete = true", countQuery = "SELECT COUNT(*) FROM review WHERE review_request_delete = 1", nativeQuery = true)
	Page<Review> findReviewConfirm(Pageable pageable);


	


}
