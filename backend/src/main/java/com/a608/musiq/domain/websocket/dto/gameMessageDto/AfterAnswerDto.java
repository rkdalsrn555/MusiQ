package com.a608.musiq.domain.websocket.dto.gameMessageDto;

import com.a608.musiq.domain.websocket.data.MessageDtoType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AfterAnswerDto {
    MessageDtoType type;
    int time;

    @Builder
    public AfterAnswerDto(MessageDtoType type, int time) {
        this.type = type;
        this.time = time;
    }
}
