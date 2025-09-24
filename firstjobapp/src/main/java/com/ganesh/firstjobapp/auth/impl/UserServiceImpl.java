package com.ganesh.firstjobapp.auth.impl;

import com.ganesh.firstjobapp.auth.User;
import com.ganesh.firstjobapp.auth.UserRepository;
import com.ganesh.firstjobapp.auth.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean createUser(User user) {
        // Check if username already exists
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return false; // Username taken
        }
        // Save user to database
        userRepository.save(user);
        return true;
    }

    @Override
    public User authenticate(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return user; // Login success
        }
        return null; // Invalid credentials
    }
}
