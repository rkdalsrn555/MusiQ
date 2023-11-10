package com.a608.musiq.domain.websocket.dto.gameMessageDto;

import com.a608.musiq.domain.websocket.data.MessageDtoType;
import java.util.List;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GameRoomPubDto {

    private MessageDtoType type;
    private List<GameRoomMemberInfo> memberInfos;
    private int roomNo;
    private String roomName;

    private String password;
    private boolean isPrivate;
//    private UUID roomManagerUUID;
    private int numberOfProblems;
    private String year;
    private String roomManager;

    @Builder
    public GameRoomPubDto(List<GameRoomMemberInfo> memberInfos, int roomNo, String roomName,
        String password, boolean isPrivate, int numberOfProblems, String year,
        String roomManager) {
        this.type = MessageDtoType.GOWAITING;
        this.memberInfos = memberInfos;
        this.roomNo = roomNo;
        this.roomName = roomName;
        this.password = password;
        this.isPrivate = isPrivate;
        this.numberOfProblems = numberOfProblems;
        this.year = year;
        this.roomManager = roomManager;

    }

}
