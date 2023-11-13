package com.a608.musiq.domain.websocket.dto.gameMessageDto;

import com.a608.musiq.domain.websocket.data.MessageDtoType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class GameStartPubDto {
    MessageDtoType messageType;
    private String message;

    public GameStartPubDto() {
        this.messageType = MessageDtoType.GAMESTART;
        this.message = "게임이 시작됩니다.";
    }
}
