package com.project.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.project.dto.OrderHistoryDTO;
import com.project.dto.ProductDTO;
import com.project.dto.PurchaseRequestDTO;
import com.project.dto.SalesHistoryDTO;
import com.project.dto.TransactionsListDTO;
import com.project.entity.Category;
import com.project.entity.Money;
import com.project.entity.OrderHistory;
import com.project.entity.Product;
import com.project.entity.Review;
import com.project.entity.SalesHistory;
import com.project.entity.Size;
import com.project.entity.User;
import com.project.entity.Wish;
import com.project.entity.TransactionsList;
import com.project.repository.CategoryRepository;
import com.project.repository.MoneyRepository;
import com.project.repository.OrderHistoryRepository;
import com.project.repository.ProductRepository;
import com.project.repository.SalesHistoryRepository;
import com.project.repository.TransactionsListRepository;
import com.project.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpe implements ProductService {
	
	private final ProductRepository pr;
	private final UserRepository ur;
	private final CategoryRepository cr;
	private final TransactionsListRepository tr;
	private final OrderHistoryRepository or;
	private final SalesHistoryRepository sr;
	private final MoneyRepository mr;
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
	public List<ProductDTO> productDetail(Long productId) {
		
		Product product = pr.findById(productId).orElseThrow(()-> new IllegalArgumentException("상품이 존재하지 않습니다."));
		
		product.setProduct_view(product.getProduct_view()+1);
		
		pr.save(product);
	
		return pr.findProductsDetail(productId)
				.stream()
				.map(ProductDTO::fromEntity)
				.collect(Collectors.toList());
	}

	// 판매물품 등록 (상품 테이블, 판매 이력 테이블)
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
 	    
 	    // 판매 이력 테이블 등록
 	    SalesHistory salesHistory = new SalesHistory();
 	    salesHistory.setSalesHistoryTime(LocalDateTime.now());
 	    salesHistory.setProduct(product);
 	    salesHistory.setUser(user);
 	    salesHistory.setTransactionsList(null);
 	    
 	    sr.save(salesHistory);
 		
 		
 		return "물품이 등록되었습니다.";
		
	}
	
	// 단 거래상태가 이미 거래중으로 바뀌었거나, 본인이 등록한 상품은 등록 불가능

	// 구매 요청 (구매 이력 테이블 + 거래 테이블)
	@Transactional
	@Override
	public String registPurchaserequest(PurchaseRequestDTO purchaseRequestDTO) {
		
		// 유저
		User user = ur.findByUserEmail(purchaseRequestDTO.getBuyerEmail()).orElseThrow(()-> new IllegalArgumentException("해당 판매자의 이메일이 존재하지 않습니다."));
		
		// 상품
		Product product = pr.findById(purchaseRequestDTO.getProductId()).orElseThrow(()-> new IllegalArgumentException("해당 상품이 존재하지 않습니다."));
		
		if(purchaseRequestDTO.getProductStatus().equals("거래중") || purchaseRequestDTO.getProductStatus().equals("거래종료")) {
		return "상품이 이미 거래중이거나 거래가 종료된 물품입니다.";
	} 
		if(purchaseRequestDTO.getBuyerEmail().equals(purchaseRequestDTO.getSellerEmail())) {
		return "해당 상품은 본인이 등록한 물품입니다.";
	}
		if(purchaseRequestDTO.getProductPrice()>purchaseRequestDTO.getBuyerMoney()) {
		return "금액이 부족합니다. 마일리지 충전 후 이용해주세요.";
	}

		// 판매 테이블 -> 거래 상태 변화 추가
		product.setProduct_status("거래중");
		
		pr.save(product);
		
		// 유저 테이블 -> 금액 깎기
		user.setUser_money((long) (purchaseRequestDTO.getBuyerMoney()-purchaseRequestDTO.getProductPrice()));
		
		ur.save(user);
		
		// 마일리지 이력 테이블
		Money money = new Money();
		
		money.setMoneyAmount(purchaseRequestDTO.getProductPrice());
		money.setMoneyComment("상품 구매"+" ("+purchaseRequestDTO.getProductName()+") ");
		money.setMoneyTime(LocalDateTime.now());
		money.setMoneyType("출금");
		money.setUser(user);
		
		mr.save(money);
		
		
		// 거래 테이블
		TransactionsList transcation = new TransactionsList();
		
		transcation.setTransactionTime(LocalDateTime.now());
		transcation.setTransactionName(purchaseRequestDTO.getTransactionName());
		transcation.setTransactionPhone(purchaseRequestDTO.getTransactionPhone());
		transcation.setTransactionAddress(purchaseRequestDTO.getTransactionAddress());
		transcation.setTransactionStatusBuyer("거래대기");
		transcation.setTransactionStatusSeller("거래요청 확인");
		transcation.setProduct(product);
		transcation.setUser(user);
				
		tr.save(transcation);
					
		// 구매 이력 테이블
		OrderHistory orderHistory = new OrderHistory();
		
		orderHistory.setOrderHistoryTime(LocalDateTime.now());
		orderHistory.setProduct(product);
		orderHistory.setUser(user);
		orderHistory.setTransactionsList(transcation);

		or.save(orderHistory);
		
		// 판매 이력 테이블
		SalesHistory saleshistory = sr.findByProduct(product).orElseThrow(() -> new IllegalArgumentException("해당 상품에 대한 판매 이력이 존재하지 않습니다."));
		
		saleshistory.setTransactionsList(transcation);
		
		sr.save(saleshistory); // 업데이트
		
		return "구매 요청이 완료되었습니다.";
	}

	// 진행중인 거래 조회
	@Override
	public Page<TransactionsListDTO> getTransactionProducts(String email, Pageable pageable) {
		
		// email로 User 찾기 (user_id 포함)
		User user = ur.findByUserEmail(email)
				.orElseThrow(()-> new IllegalArgumentException("해당 이메일이 존재하지 않습니다."));
		
		// 해당 user(user_id) 를 가진 Wish 가져오기
		 Page<TransactionsList> transactionListPage = tr.findByUser(user, pageable);
		 
		 return transactionListPage.map(transcation -> TransactionsListDTO.fromEntity(transcation));
	}

	// 구매 이력 조회
	@Override
	public Page<OrderHistoryDTO> getOrderHistoryProducts(String email, Pageable pageable) {
		// email로 User 찾기 (user_id 포함)
		User user = ur.findByUserEmail(email)
				.orElseThrow(()-> new IllegalArgumentException("해당 이메일이 존재하지 않습니다."));
		
		// 해당 user(user_id) 를 가진 Wish 가져오기
		 Page<OrderHistory> orderHistoryListPage = or.findByUser(user, pageable);
		 
		 return orderHistoryListPage.map(orderhistory -> OrderHistoryDTO.fromEntity(orderhistory));
	}

	// 판매 이력 조회
	@Override
	public Page<SalesHistoryDTO> getSalesHistoryProducts(String email, Pageable pageable) {
		// email로 User 찾기 (user_id 포함)
		User user = ur.findByUserEmail(email)
				.orElseThrow(()-> new IllegalArgumentException("해당 이메일이 존재하지 않습니다."));
		
		// 해당 user(user_id) 를 가진 Wish 가져오기
		 Page<SalesHistory> salesHistoryListPage = sr.findByUser(user, pageable);
		 
		 return salesHistoryListPage.map(saleshistory -> SalesHistoryDTO.fromEntity(saleshistory));
	}
	

	}
	



