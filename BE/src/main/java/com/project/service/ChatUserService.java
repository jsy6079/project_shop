package com.project.service;

import java.util.List;

import com.project.dto.ChatUserMessageDTO;

public interface ChatUserService {

	// 유저 & 관리자 메세지를 저장
	void saveMessage(ChatUserMessageDTO chatUserMessageDTO);

	// 대화내역 메세지를 불러오기
	List<ChatUserMessageDTO> getChatDetail(String email);

	// 관리자에서 대화를 나눈 유저들의 메세지를 불러오기
	List<ChatUserMessageDTO> getLastMessage();
	
	

}
