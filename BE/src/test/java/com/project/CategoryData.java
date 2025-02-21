package com.project;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.project.entity.Category;
import com.project.repository.CategoryRepository;

@SpringBootTest
public class CategoryData {
	
	@Autowired
	private CategoryRepository cr;
	
	@Test
	public void insertCategoryData() {
		String[] cn = {"의류","신발","가방","액세서리","패션잡화","라이프스타일"};
		
		for(String name : cn) {
			Category category = new Category();
			category.setCategory_name(name);
			cr.save(category);
		}
		
		System.out.println("카테고리 데이터 삽입 성공");
	}

}
