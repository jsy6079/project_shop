package com.project.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

import com.project.dto.ProductDTO;
import com.project.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpe implements ProductService {
	
	private final ProductRepository pr;

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


}
