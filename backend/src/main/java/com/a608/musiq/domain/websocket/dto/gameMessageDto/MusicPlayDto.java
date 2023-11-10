package com.a608.musiq.domain.websocket.dto.gameMessageDto;

import com.a608.musiq.domain.websocket.data.MessageDtoType;
import lombok.Builder;
import lombok.Getter;

@Getter
public class MusicPlayDto {

    private MessageDtoType messageType;

    @Builder
    public MusicPlayDto() {
        this.messageType = MessageDtoType.MUSICPLAY;
    }
}
