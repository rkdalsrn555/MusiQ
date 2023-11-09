package com.a608.musiq.domain.websocket.dto.gameMessageDto;

import com.a608.musiq.domain.websocket.data.MessageDtoType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AnswerInfoDto {

    private MessageDtoType type;
    private String answer;
    private String singer;
    private String winner;
    private String initialHint;

    @Builder
    public AnswerInfoDto(String answer, String singer, String winner) {
        this.type = MessageDtoType.ANSWER;
        this.answer = answer;
        this.singer = singer;
        this.winner = winner;
        this.initialHint = "";
    }
}
