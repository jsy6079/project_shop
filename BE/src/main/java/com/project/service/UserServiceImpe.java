package com.project.service;

import java.time.LocalDateTime;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.project.dto.UserDTO;
import com.project.entity.Money;
import com.project.entity.User;
import com.project.repository.MoneyRepository;
import com.project.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpe implements UserService {
	
	private final UserRepository ur;
	private final MoneyRepository mr;

	// 유저 정보 수정 (전화번호, 주소)
	@Transactional
	@Override
	public void getUserInfo(UserDTO userInfo) {
		
		// email로 User 찾기
		User user = ur.findByUserEmail(userInfo.getEmail())
				.orElseThrow(()-> new IllegalArgumentException("해당 이메일이 존재하지 않습니다."));
		
		user.setUser_phone(userInfo.getPhone());
		user.setUser_address(userInfo.getAddress());
		
	}

	// 유저 마일리지 충전
	@Transactional
	@Override
	public void addMoney(String buyerEmail, int money) {
		// email로 User 찾기
		User user = ur.findByUserEmail(buyerEmail)
				.orElseThrow(()-> new IllegalArgumentException("해당 이메일이 존재하지 않습니다."));
		
		user.setUser_money((long) (user.getUser_money()+money*0.95));
		
		Money moneyAdd = new Money(); 
		moneyAdd.setMoneyAmount((int) (money*0.95));
		moneyAdd.setMoneyComment("마일리지 충전");
		moneyAdd.setMoneyTime(LocalDateTime.now());
		moneyAdd.setMoneyType("입금");
		moneyAdd.setUser(user);
		
		mr.save(moneyAdd);
		
	}


	
	

}
