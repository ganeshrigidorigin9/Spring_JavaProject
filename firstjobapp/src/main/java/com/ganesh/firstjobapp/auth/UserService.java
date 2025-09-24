package com.ganesh.firstjobapp.auth;

public interface UserService {

    boolean createUser(User user);
    User authenticate(String username, String password);
}
