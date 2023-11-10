package com.a608.musiq.domain.websocket.dto.gameMessageDto;

import com.a608.musiq.domain.websocket.data.MessageDtoType;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GameRoomMemberDto {

    private MessageDtoType type;
    private List<GameRoomMemberInfo> memberInfos;

    @Builder
    public GameRoomMemberDto(List<GameRoomMemberInfo> memberInfos) {
        this.type = MessageDtoType.GOWAITING;
        this.memberInfos = memberInfos;
    }
}
