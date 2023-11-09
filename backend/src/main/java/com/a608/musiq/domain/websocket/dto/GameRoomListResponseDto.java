package com.a608.musiq.domain.websocket.dto;

import java.util.List;
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
public class GameRoomListResponseDto {
    private List<GameRoomListResponseItem> rooms;
}
