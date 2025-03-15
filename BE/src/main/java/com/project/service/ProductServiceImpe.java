package com.project.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.project.dto.ProductDTO;
import com.project.entity.Category;
import com.project.entity.Product;
import com.project.entity.Review;
import com.project.entity.Size;
import com.project.entity.User;
import com.project.repository.CategoryRepository;
import com.project.repository.ProductRepository;
import com.project.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpe implements ProductService {
	
	private final ProductRepository pr;
	private final UserRepository ur;
	private final CategoryRepository cr;
	private final S3Service s3s;

	// 가장 높은 조회수 8개 조회
	@Override
	public List<ProductDTO> mostView() {
		    return pr.findMostViewedProducts()  // 페이징 없이 8개만 가져옴
		             .stream()
		             .map(ProductDTO::fromEntity)
		             .collect(Collectors.toList());
	}

	// 가장 많은 찜 4개 조회
	@Override
	public List<ProductDTO> mostLike() {
		return pr.findMostLikedProducts()
				.stream()
				.map(ProductDTO::fromEntity)
				.collect(Collectors.toList());
	}

	// 가장 최근 등록된 제품 4개 조회
	@Override
	public List<ProductDTO> mostRecent() {
		return pr.findMostReCentProducts()
				.stream()
				.map(ProductDTO::fromEntity)
				.collect(Collectors.toList());
	}

	// 카테고리별 전체 데이터
	@Override
	public List<ProductDTO> productByCategory(int categoryId){
		return pr.findProductsByCategory(categoryId)
				.stream()
				.map(ProductDTO::fromEntity)
				.collect(Collectors.toList());
	}

	// 카테고리별 검색 데이터 (제품 이름, 제품 설명 기준)
	@Override
	public List<ProductDTO> productByKeword(int categoryId, String keyword) {
		return pr.findProductsByKeyWord(categoryId,keyword)
				.stream()
				.map(ProductDTO::fromEntity)
				.collect(Collectors.toList());
	}
	
	// 해당 제품 상세보기
	@Override
	public List<ProductDTO> productDetail(int productId) {
		return pr.findProductsDetail(productId)
				.stream()
				.map(ProductDTO::fromEntity)
				.collect(Collectors.toList());
	}

	// 판매물품 등록
	@Override
	public String registProduct(String productName, int productPrice, String productCategory,
			String productSize, String productDescription, String email, List<MultipartFile> productImages) {
		// 유저
		User user = ur.findByUserEmail(email).orElseThrow(()-> new IllegalArgumentException("해당 판매자의 이메일이 존재하지 않습니다."));
		// 카테고리
 		Category category = cr.findByCategoryName(productCategory).orElseThrow(()-> new IllegalArgumentException("해당 카테고리가 존재하지 않습니다."));
		
 		List<String> imageUrl = productImages.stream()
 				.map(file -> {
 					try {
 						return s3s.uploadFile("products",file);
 					} catch(Exception e) {
 						throw new RuntimeException("파일 업로드 실패"+ e);
 					}
 				}).toList();
 		
 		// 물품 등록
 		Product product = new Product();
 		product.setProduct_description(productDescription);
 		product.setProduct_like_Count(0);
 		product.setProduct_name(productName);
 		product.setProduct_price(productPrice);
 		product.setProduct_status("거래가능");
 		product.setProduct_time(LocalDateTime.now());
 		product.setProduct_view(0);
 		product.setCategory(category);
 		product.setUser(user);
 		product.setProduct_image(imageUrl);
 		
 		Size size = new Size();
 	    size.setSize_value(productSize);
 	    size.setProduct(product); // product 연결
 	    product.setSize(size);    // product에 size 연결
 	    
 	    pr.save(product);
 		
 		
 		return "물품이 등록되었습니다.";
		
	}
	

}


