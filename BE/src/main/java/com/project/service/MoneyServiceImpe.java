package com.project.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.project.dto.MoneyDTO;
import com.project.dto.ReviewDTO;
import com.project.entity.Money;
import com.project.entity.Review;
import com.project.entity.User;
import com.project.repository.MoneyRepository;
import com.project.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MoneyServiceImpe implements MoneyService {
	
	private final UserRepository ur;
	private final MoneyRepository mr;

	// 마일리지 조회
	@Override
	public Page<MoneyDTO> moneyList(String email, Pageable pageable) {
		
		// email로 User 찾기 (user_id 포함)
		User user = ur.findByUserEmail(email)
				.orElseThrow(()-> new IllegalArgumentException("해당 이메일이 존재하지 않습니다."));
		
		// 해당 user(user_id) 를 가진 마일리지 가져오기
		Page<Money> moneyPage = mr.findByUser(user, pageable);

		 return moneyPage.map(money -> MoneyDTO.fromEntity(money));
	}
	

}
