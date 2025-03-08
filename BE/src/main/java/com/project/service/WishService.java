package com.project.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import com.project.dto.ProductDTO;

public interface WishService {

	// 찜 목록 등록
	ResponseEntity<String> registWish(String email, Long product_id);

	// 찜 목록 조회
	Page<ProductDTO> wishProducts(String email,Pageable pageable);

	// 찜 목록 삭제
	ResponseEntity<String> deleteWish(String email, Long product_id);
	

	


	

	
	

}
