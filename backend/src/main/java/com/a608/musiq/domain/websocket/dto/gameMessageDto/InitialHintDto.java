package com.a608.musiq.domain.websocket.dto.gameMessageDto;

import com.a608.musiq.domain.websocket.data.MessageDtoType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class InitialHintDto {

    private MessageDtoType type;
    private String initialHint;

    @Builder
    public InitialHintDto(String initialHint) {
        this.type = MessageDtoType.INITIALHINT;
        this.initialHint = initialHint;
    }
}
