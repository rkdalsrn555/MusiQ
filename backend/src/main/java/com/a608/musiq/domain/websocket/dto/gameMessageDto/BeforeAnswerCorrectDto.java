package com.a608.musiq.domain.websocket.dto.gameMessageDto;

import com.a608.musiq.domain.websocket.data.MessageDtoType;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class BeforeAnswerCorrectDto {

    private MessageDtoType messageDtoType;
    private String nickname;
    private String title;
    private String singer;
    private int skipVote;

    public static BeforeAnswerCorrectDto create(MessageDtoType messageDtoType, String nickname,
        String title, String singer, int skipVote) {
        return new BeforeAnswerCorrectDto(messageDtoType, nickname, title, singer,skipVote);
    }

}
