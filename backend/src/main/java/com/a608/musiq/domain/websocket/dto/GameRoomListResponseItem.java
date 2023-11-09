package com.a608.musiq.domain.websocket.dto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GameRoomListResponseItem {
    private String roomTitle;
    private String roomManager;
    private int currentMembers;
    private int roomNumber;
    private boolean isPrivate;
    private List<MusicYearItem> years;
}