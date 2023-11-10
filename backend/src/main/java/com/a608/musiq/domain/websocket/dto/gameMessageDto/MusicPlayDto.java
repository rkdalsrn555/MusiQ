package com.a608.musiq.domain.websocket.dto.gameMessageDto;

import com.a608.musiq.domain.websocket.data.MessageDtoType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class MusicPlayDto {

    private MessageDtoType type;

    @Builder
    public MusicPlayDto() {
        this.type = MessageDtoType.MUSICPLAY;
    }
}
