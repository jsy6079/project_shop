package com.project.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nimbusds.oauth2.sdk.Response;
import com.project.dto.MoneyDTO;
import com.project.dto.ReviewDTO;
import com.project.dto.UserDTO;
import com.project.entity.User;
import com.project.service.MoneyService;
import com.project.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
	
	private final UserService us;
	private final MoneyService ms;
	
	// 유저 정보 수정 (전화번호, 주소)
	@PutMapping("/update")
	public ResponseEntity<String> getUserInfoUpdate(@Valid @RequestBody UserDTO userInfo, BindingResult bindingResult){
		
		if(bindingResult.hasErrors()) {
			String response = bindingResult.getAllErrors().get(0).getDefaultMessage();
			return ResponseEntity.badRequest().body(response);
		}
		
		us.getUserInfo(userInfo);
		
		return ResponseEntity.ok("수정 성공");
	}
	
	// 마일리지 이력 조회
	@GetMapping("/money/{email}")
		public ResponseEntity<Page<MoneyDTO>> getMoneyList(@PathVariable (name = "email") String email, @RequestParam(name = "page",defaultValue = "0") int page, @RequestParam(name = "size", defaultValue = "5") int size){
			Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "moneyTime"));
			Page<MoneyDTO> response = ms.moneyList(email,pageable);
			return ResponseEntity.ok(response);
		}

}
