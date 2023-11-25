package com.example.fintracker.service;

import com.example.fintracker.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private final UserService userService;

    @Autowired
    public AuthService(UserService userService) {
        this.userService = userService;
    }

    public Map<String, Object> authenticateAndGetUserInfo(String email, String password) {
        User user = userService.getUserByEmail(email);
        Map<String, Object> authResult = new HashMap<>();

        if (user != null && user.getPassword().equals(password)) {
            authResult.put("authenticated", true);
            authResult.put("userId", user.getId());
            authResult.put("username", user.getUsername());
            // Adicione outros campos que você deseja incluir na resposta
        } else {
            authResult.put("authenticated", false);
        }

        return authResult;
    }
}
