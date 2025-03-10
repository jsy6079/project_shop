package com.project.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;

import com.project.entity.Review;
import com.project.entity.User;

public interface ReviewRepository extends JpaRepository<Review, Long> {

	// 리뷰 조회
	Page<Review> findBySeller(User seller, Pageable pageable);

	// 관리자에게 리뷰 삭제 요청 : 요청 값 변경 (false -> true)
	@Modifying
	@Transactional
	@Query(value = "UPDATE Review r SET r.review_request_delete = true WHERE r.review_id = :review_id", nativeQuery = true)
	void updateReviewRquestDelete(@Param("review_id") Long review_id); 

}
