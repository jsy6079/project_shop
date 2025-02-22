package com.project;



import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.project.entity.User;
import com.project.repository.UserRepository;

@SpringBootTest
public class UserData {
	
	@Autowired
	private UserRepository ur;
	
	@Test
	public void insertUserData() {
			User user = new User();
	        user.setUser_name("판매자");
	        user.setUser_email("test@example.com");
	        user.setUser_phone("010-1234-1111");
	        user.setUser_address("서울시 강남구");
	        user.setUser_money(10000L);
	        ur.save(user);
	}

}
