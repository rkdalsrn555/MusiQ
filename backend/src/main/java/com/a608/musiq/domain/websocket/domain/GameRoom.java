package com.a608.musiq.domain.websocket.domain;

import com.a608.musiq.domain.websocket.data.GameRoomType;
import java.util.List;
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
    private int totalUsers;
    private GameRoomType gameRoomType;
    private int round;
    private int skipVote;
    private List<UserInfoItem> userInfoItemList;
}
