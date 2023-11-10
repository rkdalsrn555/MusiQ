package com.a608.musiq.domain.websocket.dto.gameMessageDto;

import com.a608.musiq.domain.websocket.data.MessageDtoType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SingerHintDto {

    private MessageDtoType type;
    private String singerHint;

    @Builder
    public SingerHintDto(String singerHint) {
        this.type = MessageDtoType.SINGERHINT;
        this.singerHint = singerHint;
    }
}
