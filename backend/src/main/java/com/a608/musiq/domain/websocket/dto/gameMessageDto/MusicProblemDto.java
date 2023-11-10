package com.a608.musiq.domain.websocket.dto.gameMessageDto;

import com.a608.musiq.domain.websocket.data.MessageDtoType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MusicProblemDto {
    private MessageDtoType type;
    private String answer;
    private String singer;
    private String winner;
    private String singerHint;
    private String initialHint;
    private String musicUrl;

    @Builder
    public MusicProblemDto(String musicUrl) {
        this.type = MessageDtoType.MUSICPROBLEM;
        this.answer = "";
        this.singer = "";
        this.winner = "";
        this.singerHint = "";
        this.initialHint = "";
        this.musicUrl = musicUrl;
    }
}
