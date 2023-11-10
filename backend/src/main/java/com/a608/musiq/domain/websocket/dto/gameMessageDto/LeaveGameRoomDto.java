package com.a608.musiq.domain.websocket.dto.gameMessageDto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LeaveGameRoomDto {
	private String nickname;
	private String CurrentRoomManagerNickname;

	public static LeaveGameRoomDto from(String nickname, String CurrentRoomManagerNickname) {
		return LeaveGameRoomDto.builder()
			.nickname(nickname)
			.CurrentRoomManagerNickname(CurrentRoomManagerNickname)
			.build();
	}
}
