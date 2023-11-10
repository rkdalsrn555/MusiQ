package com.a608.musiq.domain.websocket.dto.gameMessageDto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GameRoomMemberInfo {
    private String nickName;
    private Integer level;

    @Builder
    public GameRoomMemberInfo(String nickName, Integer level) {
        this.nickName = nickName;
        this.level = level;
    }
}
