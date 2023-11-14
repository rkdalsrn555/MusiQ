package com.a608.musiq.domain.websocket.domain;

import com.a608.musiq.domain.websocket.data.GameRoomType;
import com.a608.musiq.domain.websocket.data.GameValue;
import com.a608.musiq.domain.websocket.data.MessageDtoType;
import com.a608.musiq.domain.websocket.data.MessageType;
import com.a608.musiq.domain.websocket.data.PlayType;
import com.a608.musiq.domain.websocket.dto.responseDto.CheckPasswordResponseDto;
import com.a608.musiq.domain.websocket.dto.responseDto.EnterGameRoomResponseDto;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.EnterGameRoomDto;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.ExitGameRoomDto;
import com.a608.musiq.global.exception.exception.MultiModeException;
import com.a608.musiq.global.exception.info.MultiModeExceptionInfo;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GameRoom {
    private static final int LEAST_MEMBER_SIZE = 1;
    private static final int ROOM_DIVIDE_NUMBER = 1000;
    private static final int MAX_ROOM_USER = 6;

    private int roomNo;
    private String roomName;

    private String password;
    private boolean isPrivate;
    

    // 방장
    private UUID roomManagerUUID;
    //문제 수
    private int numberOfProblems;

    //선택한 연도
    private String year;

    private String roomManagerNickname;


    private GameRoomType gameRoomType;
    //------------------------------------------------
    private Map<UUID, UserInfoItem> userInfoItems;
    //currentMembers
    private int totalUsers;
    //------------------------------------------------
    private PlayType playType;

    private int time;


    private int skipVote;
    private int round;



    private List<MultiModeProblem> multiModeProblems;
    private MessageType messageType;


    //answerList 추가 (정답리스트)
    //gameRoomId 추가

    public void setMultiModeProblems(
        List<MultiModeProblem> multiModeProblems) {
        this.multiModeProblems = multiModeProblems;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public void setPlayType(PlayType playType) {
        this.playType = playType;
    }

    public void setSkipVote(int skipVote) {
        this.skipVote = skipVote;
    }

    public void changeGameRoomType(GameRoomType type) {
        this.gameRoomType = type;
    }

    public void changePlayType(PlayType type) {
        this.playType = type;
    }

    public void timeDown() {
        this.time--;
    }

    public void roundUp() {
        this.round++;
    }

    public ExitGameRoomDto exitUser(UUID uuid, int roomNumber) {
        int lobbyChannelNumber = roomNumber / ROOM_DIVIDE_NUMBER;
        int gameChannelNumber = roomNumber % ROOM_DIVIDE_NUMBER;
        String nickname = userInfoItems.get(uuid).getNickname();

        // 방에 아무도 안 남을 경우
        if (totalUsers == LEAST_MEMBER_SIZE) {
            Channel channel = GameValue.getChannel(lobbyChannelNumber);

            channel.clearGameRoom(gameChannelNumber);

            return ExitGameRoomDto.builder()
                .messageDtoType(MessageDtoType.EXITUSER)
                .userInfoItems(userInfoItems.values().stream().toList())
                .gameRoomManagerNickname(this.roomManagerNickname)
                .exitedUserNickname(nickname)
                .build();
        }

        // 방장 위임
        if (uuid.equals(roomManagerUUID)) {
            for(UUID userUUID : userInfoItems.keySet()) {
                if (!userUUID.equals(roomManagerUUID)) {
                    roomManagerUUID = userUUID;
                    break;
                }
            }
        }

        this.totalUsers--;
        userInfoItems.remove(uuid);

        return ExitGameRoomDto.builder()
            .messageDtoType(MessageDtoType.EXITUSER)
            .userInfoItems(userInfoItems.values().stream().toList())
            .gameRoomManagerNickname(this.roomManagerNickname)
            .exitedUserNickname(nickname)
            .build();
    }

    public CheckPasswordResponseDto checkPassword(String password) {
        if (!this.isPrivate) {
            return new CheckPasswordResponseDto(Boolean.TRUE);
        }

        if (this.password.equals(password)) {
            return new CheckPasswordResponseDto(Boolean.TRUE);
        }

        return new CheckPasswordResponseDto(Boolean.FALSE);
    }

    public EnterGameRoomResponseDto enterUser(UUID uuid, UserInfoItem userInfoItem) {
        if (!gameRoomType.equals(GameRoomType.WAITING)) {
            throw new MultiModeException(MultiModeExceptionInfo.ALREADY_STARTED_ROOM);
        }

        if (totalUsers == MAX_ROOM_USER) {
            throw new MultiModeException(MultiModeExceptionInfo.FULL_ROOM_USER);
        }

        userInfoItems.put(uuid, userInfoItem);
        totalUsers++;

        return EnterGameRoomResponseDto.builder()
            .userInfoItems(userInfoItems.values().stream().toList())
            .gameRoomManagerNickname(this.roomManagerNickname)
            .enteredUserNickname(userInfoItems.get(uuid).getNickname())
            .build();
    }

    public EnterGameRoomDto getGameRoomInformation(UUID uuid) {
        return EnterGameRoomDto.builder()
            .messageType(MessageDtoType.ENTERUSER)
            .userInfoItems(userInfoItems.values().stream().toList())
            .gameRoomManagerNickname(this.roomManagerNickname)
            .enteredUserNickname(userInfoItems.get(uuid).getNickname())
            .build();
    }

    public void initializeRoom() {
        this.gameRoomType = GameRoomType.GAME;
        this.playType = PlayType.ROUNDSTART;
        this.time = 5;
        this.round = 1;
        this.skipVote = 0;

        for(UserInfoItem userInfo : this.userInfoItems.values()) {
            userInfo.initializeUserInfo();
        }
    }

    public void setRound(int round) {
        this.round = round;
    }
}