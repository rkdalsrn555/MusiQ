package com.a608.musiq.domain.websocket.dto.gameMessageDto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LeaveGameRoomDto {
	private String nickname;
	private String currentRoomManagerNickname;

	public static LeaveGameRoomDto from(String nickname, String currentRoomManagerNickname) {
		return LeaveGameRoomDto.builder()
			.nickname(nickname)
			.currentRoomManagerNickname(currentRoomManagerNickname)
			.build();
	}
}
