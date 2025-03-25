package com.project.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.project.entity.Money;
import com.project.entity.OrderHistory;
import com.project.entity.Product;
import com.project.entity.SalesHistory;
import com.project.entity.TransactionsList;
import com.project.entity.User;
import com.project.repository.MoneyRepository;
import com.project.repository.OrderHistoryRepository;
import com.project.repository.ProductRepository;
import com.project.repository.SalesHistoryRepository;
import com.project.repository.TransactionsListRepository;
import com.project.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TradeServiceImpe implements TradeService {
	
	private final TransactionsListRepository tr;
	private final UserRepository ur;
	private final OrderHistoryRepository or;
	private final SalesHistoryRepository sr;
	private final ProductRepository pr;
	private final MoneyRepository mr;
	
	// 진행중인 거래(판매자) 요청 수락
	@Override
	public String getTradeAccept(Long transactionId) {
		
		TransactionsList transactionsList = tr.findById(transactionId).orElseThrow(()-> new IllegalArgumentException("해당 거래가 존재하지 않습니다."));
		
		// 단 판매자가 요청발송을 하면 구매 취소 불가능
		if(!transactionsList.getTransactionStatusSeller().equals("거래요청")){
		return "이미 요청확인을 한 상태입니다.";
	} 
		
		transactionsList.setTransactionStatusBuyer("검수중");  // 요청확인
		transactionsList.setTransactionStatusSeller("검수중"); // 발송대기
		
		tr.save(transactionsList);

		
		return "요청을 수락했습니다.";
	}

	// 진행중인 거래(구매자) 취소
	@Override
	public String getTradeCancel(String email, Long transactionId) {
		
		// email로 User 찾기 (user_id 포함)
		User user = ur.findByUserEmail(email)
				.orElseThrow(()-> new IllegalArgumentException("해당 이메일이 존재하지 않습니다."));
		
		TransactionsList transactionsList = tr.findById(transactionId).orElseThrow(()-> new IllegalArgumentException("해당 거래가 존재하지 않습니다."));
		
		OrderHistory orderHistory = or.findByTransactionsList(transactionsList).orElseThrow(()-> new IllegalArgumentException("해당 구매 이력이 존재하지 않습니다."));
		
		SalesHistory salesHistory = sr.findByTransactionsList(transactionsList).orElseThrow(()-> new IllegalArgumentException("해당 판매 이력이 존재하지 않습니다."));
		
		Product product = transactionsList.getProduct();
		
		// 단 판매자가 요청발송을 하면 구매 취소 불가능
		if(!transactionsList.getTransactionStatusBuyer().equals("거래대기")){
		return "판매자가 요청확인을 한 상태이므로 구매취소가 불가합니다.";
	} 
		
		// 1. 마일리지 환급 + 내역 추가
		int paybackMoney = transactionsList.getProduct().getProduct_price();
		
		user.setUser_money(user.getUser_money()+paybackMoney);
	
		
		ur.save(user);
		
		Money money = new Money();
		
		money.setMoneyAmount(transactionsList.getProduct().getProduct_price());
		money.setMoneyComment("구매 취소"+" ("+transactionsList.getProduct().getProduct_name()+") ");
		money.setMoneyTime(LocalDateTime.now());
		money.setMoneyType("입금");
		money.setUser(user);
		
		mr.save(money);
	
		// 2. 구매 취소되면 product 상태값 "거래가능" 으로 변경
		product.setProduct_status("거래가능");
		
		pr.save(product);
		
		
		// 3. 구매자에게는 "거래취소" , 판매자에게는 다시 "판매중"
		transactionsList.setTransactionStatusBuyer("거래취소");
		transactionsList.setTransactionStatusSeller("판매중");
		
	    tr.save(transactionsList);
	    
	    // 4. 구매자 구매이력에 "거래취소" , 판매자 판매이력에 "거래취소"
	    orderHistory.setOrderHistoryComment("구매자 거래취소");
	    
	    or.save(orderHistory);
	    
	    salesHistory.setSalesHistoryComment("구매자 거래취소");
	    
	    sr.save(salesHistory);
		
		// 5. 진행중인 거래에서 목록에서 사라지게, -> "거래취소" 또는 "거래종료" 일때 값이 안나타나게 하기
		

		return "구매가 정상적으로 취소되었습니다.";
	}
	
	

}
