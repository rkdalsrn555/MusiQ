package com.a608.musiq.domain.websocket.dto.gameMessageDto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GameRoomMemberInfo {
    private String nickname;
    private Integer level;

    @Builder
    public GameRoomMemberInfo(String nickName, Integer level) {
        this.nickname = nickName;
        this.level = level;
    }
}
