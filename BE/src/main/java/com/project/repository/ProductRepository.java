package com.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
	
	// 가장 높은 조회수 8개 조회
    @Query(value = "SELECT * FROM product ORDER BY product_view DESC LIMIT 8", nativeQuery = true)
    List<Product> findMostViewedProducts();
    
    // 가장 많은 찜 4개 조회
    @Query(value = "SELECT * FROM product ORDER BY product_like_Count DESC LIMIT 4", nativeQuery = true)
    List<Product> findMostLikedProducts();
    
    // 가장 최근 등록된 제품 4개 조회
    @Query(value = "SELECT * FROM product ORDER BY product_time DESC LIMIT 4", nativeQuery = true)
    List<Product> findMostReCentProducts();
}
