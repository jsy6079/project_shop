package com.project.service;


import com.project.dto.UserDTO;


public interface UserService {
	
	// 유저 정보 수정 (전화번호, 주소)
	void getUserInfo(UserDTO userInfo);

	// 유저 마일리지 충전
	void addMoney(String buyerEmail, int money);

}
