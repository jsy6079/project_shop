package com.project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.UserDTO;
import com.project.entity.User;
import com.project.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
	
	private final UserService us;
	
	// 유저 정보 수정 (전화번호, 주소)
	@PutMapping("/update")
	public ResponseEntity<String> getUserInfoUpdate(@Valid @RequestBody UserDTO userinfo, BindingResult bindingResult){
		
		if(bindingResult.hasErrors()) {
			String response = bindingResult.getAllErrors().get(0).getDefaultMessage();
			return ResponseEntity.badRequest().body(response);
		}
		
		us.getUserInfo(userinfo);
		
		return ResponseEntity.ok("수정 성공");
	}

}
