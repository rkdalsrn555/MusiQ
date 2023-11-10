package com.a608.musiq.domain.websocket.dto.gameMessageDto;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class AnswerAndSingerDto {
    private String answer;
    private String singer;

    public static AnswerAndSingerDto create(String answer, String singer){
        return new AnswerAndSingerDto(answer, singer);
    }

}
