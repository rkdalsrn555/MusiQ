package com.a608.musiq.domain.websocket.dto.gameMessageDto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GameRoomMemberInfo {
    private static final int SCORE_INITIAL_NUMBER = 0;

    private String nickname;
    private Integer score;

    @Builder
    public GameRoomMemberInfo(String nickName) {
        this.nickname = nickName;
        this.score = SCORE_INITIAL_NUMBER;
    }
}
