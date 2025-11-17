package com.example.board.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {

    private String token;
    private String type = "Bearer";
    private String username;
    private String nickname;

    public AuthResponse(String token, String username, String nickname) {
        this.token = token;
        this.username = username;
        this.nickname = nickname;
    }
}
