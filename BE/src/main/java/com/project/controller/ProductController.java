package com.project.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.dto.ProductDTO;
import com.project.dto.WishDTO;
import com.project.entity.Product;
import com.project.service.ProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductController {
	
	private final ProductService ps;
	
	// 가장 높은 조회수 8개 조회
	 @GetMapping("/mostview")
	 public ResponseEntity<List<ProductDTO>> getMostViewedProducts() {
	     List<ProductDTO> products = ps.mostView();
	    return ResponseEntity.ok(products);
	 }
	
	// 가장 많은 찜 4개 조회
	 @GetMapping("/likeview")
	 public ResponseEntity<List<ProductDTO>> getMostLikedProducts(){
		 List<ProductDTO> products = ps.mostLike();
		 return ResponseEntity.ok(products);
	 }
	 
	// 가장 최근 등록된 제품 4개 조회
	 @GetMapping("/recent")
	 public ResponseEntity<List<ProductDTO>> getMostRecentProducts(){
		 List<ProductDTO> products = ps.mostRecent();
		 return ResponseEntity.ok(products);
	 }
	 
	// 카테고리별 전체 데이터
	 @GetMapping("/category/{categoryId}")
	 public ResponseEntity<List<ProductDTO>> getProductByCategory(@PathVariable(name = "categoryId") int categoryId){
		 List<ProductDTO> products = ps.productByCategory(categoryId);
		 return ResponseEntity.ok(products);
	 }
	 
	// 카테고리별 검색 데이터 (제품 이름, 제품 설명 기준)
	 @GetMapping("/category/{categoryId}/{keyword}")
	 public ResponseEntity<List<ProductDTO>> getProductByKeword(@PathVariable(name = "categoryId") int categoryId, @PathVariable(name = "keyword") String keyword){
		 List<ProductDTO> products = ps.productByKeword(categoryId,keyword);
		 return ResponseEntity.ok(products);
	 }
	 
	// 해당 제품 상세보기
	 @GetMapping("/detail/{productId}")
	 public ResponseEntity<List<ProductDTO>> getProductDetail(@PathVariable(name = "productId") int productId){
		 List<ProductDTO> products = ps.productDetail(productId);
		 return ResponseEntity.ok(products);
	 }
	 
	 // 판매물품 등록
	 @PostMapping("/regist")
	 public ResponseEntity<String> registProducts(
	     @RequestParam("productName") String productName,
	     @RequestParam("productPrice") int productPrice,
	     @RequestParam("productCategory") String productCategory,
	     @RequestParam("productSize") String productSize,
	     @RequestParam("productDescription") String productDescription,
	     @RequestParam("email") String email,
	     @RequestParam("productImage[]") List<MultipartFile> productImages
	 ) {
	     // 서비스 호출 및 로직
	     String response = ps.registProduct(productName, productPrice, productCategory, productSize, productDescription, email, productImages);
	
	     return ResponseEntity.ok(response);
	 } 
	
}
