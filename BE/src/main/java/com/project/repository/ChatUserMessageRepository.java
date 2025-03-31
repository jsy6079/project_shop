package com.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.entity.ChatUserMessage;

public interface ChatUserMessageRepository extends JpaRepository<ChatUserMessage, Long> {

	// 대화내역 메세지를 불러오기
	@Query(value = "SELECT * FROM ChatUserMessage WHERE user_id = :userId ORDER BY chatUserMessageTime ASC", nativeQuery = true)
		List<ChatUserMessage> findByUserCustom(@Param("userId") Long userId);

	// 관리자에서 대화를 나눈 유저들의 메세지를 불러오기
	@Query(value = "SELECT * FROM ChatUserMessage WHERE chatUserMessageTime IN (SELECT MAX(chatUserMessageTime) FROM ChatUserMessage GROUP BY user_id) ORDER BY chatUserMessageTime DESC", nativeQuery = true)
	List<ChatUserMessage> findLastMessagesByUser();

}
