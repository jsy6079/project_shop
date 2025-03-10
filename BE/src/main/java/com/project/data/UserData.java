package com.project.data;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import com.project.entity.User;
import com.project.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@Profile("dev")
@RequiredArgsConstructor
public class UserData {
	
	private final UserRepository ur;

	public void insertDate() {
		if(ur.count() == 1) {
			User user = new User();
	        user.setUser_name("판매자");
	        user.setUserEmail("test@example.com");
	        user.setProfileImg("test.jpg");
	        user.setUser_phone("010-1234-1111");
	        user.setUser_address("서울시 강남구");
	        user.setUser_money(10000L);
	        user.setUser_reviewScore(100L);
	        ur.save(user);
		}
		
	}

}
