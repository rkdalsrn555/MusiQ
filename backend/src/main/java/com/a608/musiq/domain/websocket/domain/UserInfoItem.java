package com.a608.musiq.domain.websocket.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoItem {

    private String nickname;
    private String score;
    private Boolean isSkipped;

    public static UserInfoItem create(String nickname, String score, Boolean isSkipped) {
        return new UserInfoItem(nickname, score, isSkipped);
    }
}
