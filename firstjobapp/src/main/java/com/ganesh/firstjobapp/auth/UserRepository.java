package com.ganesh.firstjobapp.auth;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    // This method is what your service is trying to call
    User findByUsername(String username);
}
