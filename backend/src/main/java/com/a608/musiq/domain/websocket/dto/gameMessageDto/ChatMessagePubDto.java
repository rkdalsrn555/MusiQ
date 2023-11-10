package com.a608.musiq.domain.websocket.dto.gameMessageDto;

import com.a608.musiq.domain.websocket.data.MessageDtoType;
import lombok.AllArgsConstructor;

@AllArgsConstructor

public class ChatMessagePubDto {
    MessageDtoType type;
    private String nickName;
    private String message;

    public static ChatMessagePubDto create(MessageDtoType type, String nickName, String message){

        return new ChatMessagePubDto(type, nickName, message);
    }
}
