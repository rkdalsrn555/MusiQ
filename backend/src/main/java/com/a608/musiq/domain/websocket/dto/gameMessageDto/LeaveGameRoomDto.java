package com.a608.musiq.domain.websocket.dto.gameMessageDto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LeaveGameRoomDto {
	private String nickname;

	public static LeaveGameRoomDto of(String nickname) {
		return LeaveGameRoomDto.builder()
			.nickname(nickname)
			.build();
	}
}
