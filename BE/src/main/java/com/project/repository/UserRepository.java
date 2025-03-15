package com.project.repository;


import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	// 이메일로 user 찾기
	Optional<User> findByUserEmail(String email);

	




}
