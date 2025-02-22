package com.project.service;

import java.util.List;

import com.project.dto.ProductDTO;
import com.project.entity.Product;

public interface ProductService {

	// 가장 높은 조회수 8개 조회
	List<ProductDTO> mostView();

	// 가장 많은 찜 4개 조회
	List<ProductDTO> mostLike();

	// 가장 최근 등록된 제품 4개 조회
	List<ProductDTO> mostRecent();

}
