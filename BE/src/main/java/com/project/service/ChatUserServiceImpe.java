package com.project.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.project.dto.ChatUserMessageDTO;
import com.project.entity.AdminUser;
import com.project.entity.ChatUserMessage;
import com.project.entity.User;
import com.project.repository.AdminUserRepository;
import com.project.repository.ChatUserMessageRepository;
import com.project.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatUserServiceImpe implements ChatUserService {
	
	private final ChatUserMessageRepository cr;
	private final UserRepository ur;
	private final AdminUserRepository aur;

	// 유저 & 관리자 메세지를 저장
	@Override
	public void saveMessage(ChatUserMessageDTO chatUserMessageDTO) {
			
//		User user = ur.findByUserEmail(chatUserMessageDTO.getSender()).orElseThrow(() -> new RuntimeException("해당 유저는 존재하지않습니다."));
//		
//		
//		AdminUser adminUser = aur.findById(1L).orElseThrow(() -> new RuntimeException("해당 관리자는 존재하지않습니다."));
		
	    User user;
	    AdminUser adminUser;

	    // 1. sender가 유저일 경우
	    if ("user".equalsIgnoreCase(chatUserMessageDTO.getRole())) {
	        user = ur.findByUserEmail(chatUserMessageDTO.getSender())
	                 .orElseThrow(() -> new RuntimeException("해당 유저는 존재하지 않습니다."));
	        adminUser = aur.findById(1L)
	                 .orElseThrow(() -> new RuntimeException("해당 관리자 없음"));
	    }
	    
	    // 2. sender가 관리자일 경우
	    else if ("admin".equalsIgnoreCase(chatUserMessageDTO.getRole())) {
	        adminUser = aur.findById(1L)
	                 .orElseThrow(() -> new RuntimeException("해당 관리자 없음"));
	        user = ur.findByUserEmail(chatUserMessageDTO.getSender())
	                 .orElseThrow(() -> new RuntimeException("해당 유저는 존재하지 않습니다."));
	    }
	    else {
	        throw new RuntimeException("알 수 없는 역할");
	    }
	    
		
		ChatUserMessage message = new ChatUserMessage();
		
		message.setUser(user);
		message.setAdmin(adminUser);
		message.setChatUserMessagecontent(chatUserMessageDTO.getChatUserMessagecontent());
		message.setRole(chatUserMessageDTO.getRole());
		message.setChatUserMessageTime(LocalDateTime.now());
		
		chatUserMessageDTO.setChatUserMessageId(null);
		
		cr.save(message);
		
	}

	// 대화내역 메세지를 불러오기
	@Override
	public List<ChatUserMessageDTO> getChatDetail(String email) {
		
		
		User user = ur.findByUserEmail(email).orElseThrow(() -> new RuntimeException("해당 유저는 존재하지않습니다."));
		
        List<ChatUserMessage> messages = cr.findByUserCustom(user.getUser_id());
        return messages.stream()
                .map(ChatUserMessageDTO::fromEntity)
                .collect(Collectors.toList());
	}

	// 관리자에서 대화를 나눈 유저들의 메세지를 불러오기
	@Override
	public List<ChatUserMessageDTO> getLastMessage() {
		
        List<ChatUserMessage> messages = cr.findLastMessagesByUser();
        return messages.stream()
                .map(ChatUserMessageDTO::fromEntity)
                .collect(Collectors.toList());
	}
	
	

}
