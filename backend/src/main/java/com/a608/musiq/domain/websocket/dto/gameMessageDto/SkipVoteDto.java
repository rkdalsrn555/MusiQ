package com.a608.musiq.domain.websocket.dto.gameMessageDto;

import com.a608.musiq.domain.websocket.data.MessageDtoType;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class SkipVoteDto {
    private MessageDtoType messageDtoType;
    private Boolean isSkipped;
    private Integer skipVote;

    public static SkipVoteDto create(MessageDtoType messageDtoType, Boolean isSkipped, Integer skipVote){
        return new SkipVoteDto(messageDtoType, isSkipped, skipVote);
    }

}
