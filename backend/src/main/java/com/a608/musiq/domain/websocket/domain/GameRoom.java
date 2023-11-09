package com.a608.musiq.domain.websocket.domain;

import com.a608.musiq.domain.websocket.data.GameRoomType;
import com.a608.musiq.domain.websocket.data.MessageType;
import com.a608.musiq.domain.websocket.data.PlayType;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GameRoom {
    /*
    !!!!!!!!!!!!!!!!!전체적으로 수정해야 함!!!!!!!!!!!!!!!!!
    */
    private int roomNo;
    private String roomName;
    private String password;

    // 방장
    private UUID roomManagerUUID;
    //문제 수
    private int numberOfProblems;

    //선택한 연도
    private String year;


    private GameRoomType gameRoomType;
    private PlayType playType;

    private int time;
    private int totalUsers;
    private int skipVote;
    private int round;
    private Map<UUID, UserInfoItem> userInfoItems;

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

    public void setUserInfoItems(
        Map<UUID, UserInfoItem> userInfoItems) {
        this.userInfoItems = userInfoItems;
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
}