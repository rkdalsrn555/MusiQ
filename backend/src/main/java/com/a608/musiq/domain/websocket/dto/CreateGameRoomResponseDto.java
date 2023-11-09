package com.a608.musiq.domain.websocket.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class CreateGameRoomResponseDto {
    private int gameRoomNo;
    private String roomName;
    private String password;
    private List<MusicYearItem> musicYearItems;
    private int quizAmount;
}
