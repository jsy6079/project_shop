package com.project.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.dto.ProductDTO;
import com.project.dto.PurchaseRequestDTO;
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
	     @RequestParam(value = "productImage[]", required = false) List<MultipartFile> productImages

	 ) {
		 
		// 필수 값 체크
	    if (productName == null || productName.trim().isEmpty() ||
	        productPrice <= 0 ||
	        productCategory == null || productCategory.trim().isEmpty() ||
	        productSize == null || productSize.trim().isEmpty() ||
	        productImages == null || productImages.isEmpty() ||
	        productDescription.length() > 100) {
	        
	        return ResponseEntity.badRequest().body("필수 입력값을 확인해주세요.");
	    }
		 	
		 
	     // 서비스 호출 및 로직
	     String response = ps.registProduct(productName, productPrice, productCategory, productSize, productDescription, email, productImages);
	
	     return ResponseEntity.ok(response);
	 } 
	 
	 // 구매 요청 (구매 이력 테이블 + 거래 테이블)
	 @PostMapping("/payment")
	 public ResponseEntity<String> registPurchaserequest(@RequestBody PurchaseRequestDTO purchaseRequestDTO){
		 String response = ps.registPurchaserequest(purchaseRequestDTO);
		 
		 return ResponseEntity.ok(response);
	 }
	 
	// 진행중인 거래 조회
	@GetMapping("/view/{email}")
	public ResponseEntity<Page<PurchaseRequestDTO>> getTransactionProducts(@PathVariable (name = "email") String email, @RequestParam(name = "page",defaultValue = "0") int page, @RequestParam(name = "size", defaultValue = "5") int size){

		Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "transactionTime"));

		Page<PurchaseRequestDTO> response = ps.getTransactionProducts(email,pageable);
		return ResponseEntity.ok(response);
	}
	
}
