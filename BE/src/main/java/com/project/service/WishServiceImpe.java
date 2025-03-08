package com.project.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.project.dto.ProductDTO;
import com.project.entity.Product;
import com.project.entity.User;
import com.project.entity.Wish;
import com.project.repository.ProductRepository;
import com.project.repository.UserRepository;
import com.project.repository.WishRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WishServiceImpe implements WishService {
	
	private final WishRepository wr;
	private final UserRepository ur;
	private final ProductRepository pr;

	// 찜 목록 등록
	@Override
	public ResponseEntity<String> registWish(String email, Long product_id) {
		
		// email로 User 찾기
		User user = ur.findByUserEmail(email)
				.orElseThrow(()-> new IllegalArgumentException("해당 이메일이 존재하지 않습니다."));
		
		// productId 로 product 찾기
		Product product = pr.findById(product_id)
				.orElseThrow(()-> new IllegalArgumentException("해당 상품이 존재하지 않습니다."));
		
		// 이미 찜한 상품인지 확인
		if(wr.existsByUserAndProduct(user, product)) {
			return ResponseEntity.ok("이미 찜한 상품입니다.");
		}
		
		
		// Wish 엔티티 생성 및 저장
		Wish wish = new Wish();
		wish.setUser(user);
		wish.setProduct(product);
		wish.setWishTime(LocalDateTime.now());
		
		wr.save(wish);
		
		// 상품 찜 증가 로직
		product.setProduct_like_Count(product.getProduct_like_Count()+1);
		pr.save(product);
		
		return ResponseEntity.ok("찜 목록에 추가 되었습니다.");
		
	}

	// 찜 목록 조회
	@Override
	public Page<ProductDTO> wishProducts(String email, Pageable pageable) {
		
		// email로 User 찾기 (user_id 포함)
		User user = ur.findByUserEmail(email)
				.orElseThrow(()-> new IllegalArgumentException("해당 이메일이 존재하지 않습니다."));
		
		// 해당 user(user_id) 를 가진 Wish 가져오기
		 Page<Wish> wishPage = wr.findByUser(user, pageable);
		
		// Wish 엔티티에서 연결된 Product 엔티티를 가져와서 ProductDTO로 변환 후 반환		
		 return wishPage.map(wish -> ProductDTO.fromEntity(wish.getProduct()));
	}

	// 찜 목록 삭제
	@Override
	public ResponseEntity<String> deleteWish(String email, Long product_id) {
		
		// email로 User 찾기
		User user = ur.findByUserEmail(email)
				.orElseThrow(()-> new IllegalArgumentException("해당 이메일이 존재하지 않습니다."));
		
		// user를 찾았어? 해당 유저의 id에 해당하고 product_id 를 해당하는 녀석을 제거해라
		
		 wr.deleteWish(user.getUser_id(), product_id);
		
		return ResponseEntity.ok("삭제되었습니다.");
	}

	

}
