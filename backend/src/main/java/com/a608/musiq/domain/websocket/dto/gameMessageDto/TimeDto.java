package com.a608.musiq.domain.websocket.dto.gameMessageDto;

import com.a608.musiq.domain.websocket.data.MessageDtoType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TimeDto {

    private MessageDtoType type;
    private Integer time;

    @Builder
    public TimeDto(Integer time) {
        this.type = MessageDtoType.TIME;
        this.time = time;
    }
}
