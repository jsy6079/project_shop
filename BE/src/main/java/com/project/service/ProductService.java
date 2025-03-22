package com.project.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.project.dto.OrderHistoryDTO;
import com.project.dto.ProductDTO;
import com.project.dto.PurchaseRequestDTO;
import com.project.dto.SalesHistoryDTO;
import com.project.dto.TransactionsListDTO;
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

	// 판매물품 등록
	String registProduct(String productName, int productPrice, String productCategory,
			String productSize, String productDescription, String email, List<MultipartFile> productImages);

	// 구매 요청 (구매 이력 테이블 + 거래 테이블)
	String registPurchaserequest(PurchaseRequestDTO purchaseRequestDTO);

	// 진행중인 거래 조회
	Page<TransactionsListDTO> getTransactionProducts(String email, Pageable pageable);

	// 구매 이력 조회
	Page<OrderHistoryDTO> getOrderHistoryProducts(String email, Pageable pageable);

	// 판매 이력 조회
	Page<SalesHistoryDTO> getSalesHistoryProducts(String email, Pageable pageable);

}
