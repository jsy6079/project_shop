package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entity.AdminUser;

public interface AdminUserRepository extends JpaRepository<AdminUser, Long> {

	AdminUser findByAdminUserEmail(String adminUserEmail);

}
