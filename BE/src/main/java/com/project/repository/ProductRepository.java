package com.project.repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.dto.ProductDTO;
import com.project.entity.Product;
import com.project.entity.User;
import com.project.entity.Wish;

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
    
    // 카테고리별 전체 데이터
    @Query(value = "SELECT * FROM product WHERE category_id = :categoryId", nativeQuery = true)
    List<Product> findProductsByCategory(@Param("categoryId") int categoryId);

    // 카테고리별 검색 데이터 (제품 이름, 제품 설명 기준)
    @Query(value = "SELECT * FROM product WHERE category_id = :categoryId AND (product_name LIKE CONCAT('%', :keyword, '%') OR product_description LIKE CONCAT('%', :keyword, '%'))", nativeQuery = true)
    List<Product> findProductsByKeyWord(@Param("categoryId") int categoryId, @Param("keyword") String keyword);

    // 해당 제품 상세보기
    @Query(value = "SELECT * FROM product WHERE product_id = :productId", nativeQuery = true)
    List<Product> findProductsDetail(@Param("productId") int productId);

    
}
