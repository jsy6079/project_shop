package com.project.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.project.dto.MoneyDTO;

public interface MoneyService {

	// 마일리지 조회
	Page<MoneyDTO> moneyList(String email, Pageable pageable);

}
