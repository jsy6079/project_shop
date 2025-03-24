package com.project.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.project.entity.Product;
import com.project.entity.User;
import com.project.entity.Wish;

public interface WishRepository extends JpaRepository<Wish, Long> {

	// 찜 목록 되어있는지 상품 확인
	boolean existsByUserAndProduct(User user, Product product);

	// 해당 유저의 찜 목록 가져오기
	Page<Wish> findByUser(User user, Pageable pageable);

	// 삭제
	@Modifying
	@Transactional
	@Query(value = "DELETE FROM Wish WHERE product_id = :product_id AND user_id = :userId", nativeQuery = true)
	void deleteWish(@Param("userId") Long userId, @Param("product_id") Long product_id);

}
