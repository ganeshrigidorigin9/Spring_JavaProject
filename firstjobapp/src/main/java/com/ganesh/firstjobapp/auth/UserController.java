package com.ganesh.firstjobapp.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    public UserService userService;

    public UserController(UserService userService)
    {
        this.userService=userService;
    }

    //Signup user
    @PostMapping("/signup")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        boolean created = userService.createUser(user);
        if (created) {
            return ResponseEntity.ok("User registered successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
        }
    }

    // Login user
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        User user = userService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());
        if (user != null) {
            // For now, just return user info or success message
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }


}
