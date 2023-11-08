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
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GameRoom {
    /*
    !!!!!!!!!!!!!!!!!전체적으로 수정해야 함!!!!!!!!!!!!!!!!!
    */
    private String roomName;
    private String password;

    private GameRoomType gameRoomType;
    private PlayType playType;

    private int totalUsers;
    private int skipVote;
    private int round;
    private Map<UUID, UserInfoItem> userInfoItems;
<<<<<<< Updated upstream
    private List<MultiModeProblem> multiModeProblems;
=======
    private List<MusicInfo> musicInfos;

>>>>>>> Stashed changes

    private MessageType messageType;
    //messageType 추가
    //answerList 추가 (정답리스트)
    //gameRoomId 추가
}
