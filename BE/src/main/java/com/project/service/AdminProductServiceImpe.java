package com.project.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.project.dto.TransactionsListDTO;
import com.project.entity.TransactionsList;
import com.project.entity.Product;
import com.project.entity.SalesHistory;
import com.project.entity.User;
import com.project.entity.Money;
import com.project.entity.OrderHistory;
import com.project.repository.MoneyRepository;
import com.project.repository.OrderHistoryRepository;
import com.project.repository.ProductRepository;
import com.project.repository.SalesHistoryRepository;
import com.project.repository.TransactionsListRepository;
import com.project.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminProductServiceImpe implements AdminProductService {
	
	private final TransactionsListRepository tr;
	private final ProductRepository pr;
	private final UserRepository ur;
	private final MoneyRepository mr;
	private final OrderHistoryRepository or;
	private final SalesHistoryRepository sr;
	

	// 검수 전 진행중인 거래 리스트 가져오기
	@Override
	public Page<TransactionsListDTO> getBeforeInspection(Pageable pageable) {
		
		String status = "검수대기";
		Page<TransactionsList> transactionsListPage = tr.findByTransactionStatusBuyerAndTransactionStatusSeller(status, status, pageable);

		
		return transactionsListPage.map(transactionsList -> TransactionsListDTO.fromEntity(transactionsList));
	}

	// 검수 중 진행중인 거래 리스트 가져오기
	@Override
	public Page<TransactionsListDTO> getDuringInspection(Pageable pageable) {
		
		String status = "검수중";
		Page<TransactionsList> transactionsListPage = tr.findByTransactionStatusBuyerAndTransactionStatusSeller(status, status, pageable);

		
		return transactionsListPage.map(transactionsList -> TransactionsListDTO.fromEntity(transactionsList));
	}

	// 검수 완료 진행중인 거래 리스트 가져오기
	@Override
	public Page<TransactionsListDTO> getAfterInspection(Pageable pageable) {
		
		List<String> statuses = List.of("검수완료", "검수실패");

		  Page<TransactionsList> transactionsListPage = tr.findByTransactionStatusBuyerInAndTransactionStatusSellerIn(statuses, statuses, pageable);
		
		return transactionsListPage.map(transactionsList -> TransactionsListDTO.fromEntity(transactionsList));
	}

	// 검수 시작
	@Override
	public String putStartInspection(Long transactionId) {
		
		TransactionsList transactionsList = tr.findById(transactionId).orElseThrow(()-> new IllegalArgumentException("해당 거래 내역이 존재하지 않습니다."));
		
		transactionsList.setTransactionStatusBuyer("검수중");
		transactionsList.setTransactionStatusSeller("검수중");
		
		tr.save(transactionsList);
		
		return "검수를 시작합니다.";
	}

	// 검수 통과
	@Override
	public String putPassInspection(Long transactionId) {
		TransactionsList transactionsList = tr.findById(transactionId).orElseThrow(()-> new IllegalArgumentException("해당 거래 내역이 존재하지 않습니다."));
		
		transactionsList.setTransactionStatusBuyer("검수완료");
		transactionsList.setTransactionStatusSeller("검수완료");
		
		tr.save(transactionsList);
		
		return "통과 처리 되었습니다.";
	}

	// 검수 실패
	@Override
	public String putFailInspection(Long transactionId) {
		TransactionsList transactionsList = tr.findById(transactionId).orElseThrow(()-> new IllegalArgumentException("해당 거래 내역이 존재하지 않습니다."));
		
		transactionsList.setTransactionStatusBuyer("검수실패");
		transactionsList.setTransactionStatusSeller("검수실패");
		
		tr.save(transactionsList);
		
		return "실패 처리 되었습니다.";
	}

	// 검수 성공 후 배송 처리
	@Override
	public String putDeliveryInspection(Long transactionId) {
		
		// 진행중인 거래 상태값 변경
		TransactionsList transactionsList = tr.findById(transactionId).orElseThrow(()-> new IllegalArgumentException("해당 거래 내역이 존재하지 않습니다."));
		
		transactionsList.setTransactionStatusBuyer("거래종료");
		transactionsList.setTransactionStatusSeller("거래종료");
		
		tr.save(transactionsList);
		
		// 상품테이블의 상태는 거래 종료로 바뀜
		Product product = pr.findById(transactionsList.getProduct().getProduct_id()).orElseThrow(()-> new IllegalArgumentException("해당 거래에 연결된 상품 내역이 존재하지 않습니다."));
		
		product.setProduct_status("거래종료");
		
		pr.save(product);

		// 판매자에게 해당 상품 금액만큼 마일리지 증가 (수수료 제거 금액)
		User user = ur.findById(transactionsList.getSeller().getUser_id()).orElseThrow(()-> new IllegalArgumentException("해당 거래에 연결된 판매자의 유저 내역이 존재하지 않습니다."));

		user.setUser_money(user.getUser_money() + (int)(transactionsList.getProduct().getProduct_price() * 0.95));
		
		ur.save(user);
		
		// 마일리지 내역 새로 생성
		Money money = new Money();
		
		money.setMoneyAmount((int)(transactionsList.getProduct().getProduct_price() * 0.95));
		money.setMoneyComment("상품 판매 ("+transactionsList.getProduct().getProduct_name()+")");
		money.setMoneyTime(LocalDateTime.now());
		money.setMoneyType("입금");
		money.setUser(user);
		
		mr.save(money);
		
		return "배송 처리가 완료되었습니다.";
	}

	// 검수 실패 후 반송 처리
	@Override
	public String putReturnInspection(Long transactionId) {
		
		// 진행중인 거래 상태값 변경
		TransactionsList transactionsList = tr.findById(transactionId).orElseThrow(()-> new IllegalArgumentException("해당 거래 내역이 존재하지 않습니다."));
		
		transactionsList.setTransactionStatusBuyer("거래종료");
		transactionsList.setTransactionStatusSeller("거래종료");
		
		tr.save(transactionsList);
		
		// 상품테이블의 상태는 거래 종료로 바뀜
		Product product = pr.findById(transactionsList.getProduct().getProduct_id()).orElseThrow(()-> new IllegalArgumentException("해당 거래에 연결된 상품 내역이 존재하지 않습니다."));
		
		product.setProduct_status("거래종료");
		
		pr.save(product);
		
		// 구매자에게 해당 상품 금액만큼 마일리지 증가
		User user = ur.findById(transactionsList.getBuyer().getUser_id()).orElseThrow(()-> new IllegalArgumentException("해당 거래에 연결된 구매자의 유저 내역이 존재하지 않습니다."));

		user.setUser_money(user.getUser_money()+transactionsList.getProduct().getProduct_price());
		
		ur.save(user);
		
		// 마일리지 내역 새로 생성
		Money money = new Money();
		
		money.setMoneyAmount(transactionsList.getProduct().getProduct_price());
		money.setMoneyComment("검수 실패로 인한 환급 ("+transactionsList.getProduct().getProduct_name()+")");
		money.setMoneyTime(LocalDateTime.now());
		money.setMoneyType("입금");
		money.setUser(user);
		
		mr.save(money);

		// 비고란에 검수 실패 사유 써주기 orderHistory, salesHistory 연결
		
		OrderHistory orderHistory = or.findByTransactionsList(transactionsList).orElseThrow(()-> new IllegalArgumentException("해당 거래에 연결된 구매자의 구매 내역이 존재하지 않습니다."));
		
		orderHistory.setOrderHistoryComment("검수 기준 미달로 거래 종료");
		
		or.save(orderHistory);
		
		SalesHistory salesHistory = sr.findByTransactionsList(transactionsList).orElseThrow(()-> new IllegalArgumentException("해당 거래에 연결된 판매자의 판매 내역이 존재하지 않습니다."));
		
		salesHistory.setSalesHistoryComment("검수 기준 미달로 거래 종료");
		
		sr.save(salesHistory);
		
		
		return "반송 처리가 완료되었습니다.";
	}
	
	

}
