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

	// 카테고리별 전체 데이터
	List<ProductDTO> productByCategory(int categoryId);

	// 카테고리별 검색 데이터 (제품 이름, 제품 설명 기준)
	List<ProductDTO> productByKeword(int categoryId, String keyword);
	
	// 해당 제품 상세보기
	List<ProductDTO> productDetail(int productId);

}
