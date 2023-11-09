package com.a608.musiq.domain.websocket.dto.gameMessageDto;

import com.a608.musiq.domain.websocket.data.MessageDtoType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RoundStartDto {
    MessageDtoType type;
    int time;
    String musicUrl;

    @Builder
    public RoundStartDto(MessageDtoType type, int time, String musicUrl) {
        this.type = type;
        this.time = time;
        this.musicUrl = musicUrl;
    }
}
