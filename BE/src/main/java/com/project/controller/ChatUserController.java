package com.project.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.ChatUserMessageDTO;
import com.project.service.ChatUserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChatUserController {
	
	private final ChatUserService cs;
	
	// 유저 & 관리자 메세지를 저장
	@PostMapping("/save")
	public ResponseEntity<Void> saveMessage(@RequestBody ChatUserMessageDTO chatUserMessageDTO){
		
		cs.saveMessage(chatUserMessageDTO);
		
		return ResponseEntity.ok().build();

	}
	
	// 대화내역 메세지를 불러오기
	@GetMapping("/detail")
	public ResponseEntity<List<ChatUserMessageDTO>> getChatDetail(@RequestParam(name = "email") String email){
		List<ChatUserMessageDTO> messages = cs.getChatDetail(email);
		
		return ResponseEntity.ok(messages);
	}
	
	
	// 관리자에서 대화를 나눈 유저들의 메세지를 불러오기
	@GetMapping("/lastMessage")
	public ResponseEntity<List<ChatUserMessageDTO>> getLastMessage(){
		List<ChatUserMessageDTO> lastMessages = cs.getLastMessage();
		
		return ResponseEntity.ok(lastMessages);
	}
	

}
