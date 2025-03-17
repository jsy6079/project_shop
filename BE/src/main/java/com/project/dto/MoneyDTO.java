package com.project.dto;

import java.time.LocalDateTime;

import com.project.entity.Money;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MoneyDTO {
	
	private Long moneyId;
	private LocalDateTime moneyTime;
	private String moneyType;
	private int moneyAmount;
	private String moneyComment;
	private Long userId; // FK로 user_id 추가
	
	public static MoneyDTO fromEntity(Money money) {
		return new MoneyDTO(
				money.getMoneyId(),
				money.getMoneyTime(),
				money.getMoneyType(),
				money.getMoneyAmount(),
				money.getMoneyComment(),
				money.getUser().getUser_id()
				
		);
	}

}
