package com.project.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.project.dto.UserDTO;
import com.project.entity.User;
import com.project.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpe implements UserService {
	
	private final UserRepository ur;

	// 유저 정보 수정 (전화번호, 주소)
	@Transactional
	@Override
	public void getUserInfo(UserDTO userinfo) {
		
		// email로 User 찾기
		User user = ur.findByUserEmail(userinfo.getEmail())
				.orElseThrow(()-> new IllegalArgumentException("해당 이메일이 존재하지 않습니다."));
		
		System.out.println(userinfo.getPhone());
		System.out.println(userinfo.getAddress());
		
		user.setUser_phone(userinfo.getPhone());
		user.setUser_address(userinfo.getAddress());
		
	
		
	}


	
	

}
