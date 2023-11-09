package com.a608.musiq.domain.websocket.domain;

import com.a608.musiq.domain.websocket.data.MessageType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage {
    private String nickName;
    private String message;
    //private MessageType messageType;
    //백단에서 다 messageType 처리할 거면 MessageType 필요 없음

}
