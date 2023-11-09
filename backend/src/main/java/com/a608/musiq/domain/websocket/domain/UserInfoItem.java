package com.a608.musiq.domain.websocket.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserInfoItem {

    private String nickname;
    private Double score;
    private Boolean isSkipped;

    public static UserInfoItem create(String nickname, Double score, Boolean isSkipped) {
        return new UserInfoItem(nickname, score, isSkipped);
    }

    public void setSkipped(Boolean skipped) {
        isSkipped = skipped;
    }
}
