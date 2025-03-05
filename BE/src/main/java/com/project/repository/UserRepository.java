package com.project.repository;


import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	@Query(value = "SELECT * FROM user WHERE user_email = :user_email", nativeQuery = true)
	Optional<User> findByUserEmail(@Param("user_email") String email);

}
