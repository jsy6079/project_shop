package com.project;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.project.entity.Product;
import com.project.entity.Size;
import com.project.repository.ProductRepository;
import com.project.repository.SizeRepository;

@SpringBootTest
public class sizeData {
	
	@Autowired
	private SizeRepository sr;
	
	@Autowired
	private ProductRepository pr;
	
	@Test
	public void insertSizeDate() {
		
		// 모든 상품 데이터 가져오기
		List<Product> products = pr.findAll();
		
		for(Product product : products) {
			Long categoryId = product.getCategory().getCategory_id();
			String sizeValue;
			
			if(categoryId == 1) {
				sizeValue = "M";
			}
			else if(categoryId == 2) {
				sizeValue = "240";
			}else {
				continue; // 가방, 액세서리, 패션잡화, 라이프스타일 등은 사이즈 미존재
			}
			
		    Size size = new Size();
		    size.setProduct(product); // 같은 product_id에 한 개의 사이즈만 추가
		    size.setSize_value(sizeValue);
		    sr.save(size);
		    
			}
		System.out.println("카테고리별 사이즈 데이터 삽입 완료");

		}
		
	
		
		}




