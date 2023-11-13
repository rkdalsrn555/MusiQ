package com.a608.musiq.domain.websocket.dto.gameMessageDto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EnterGameRoomDto {
	private String nickname;

	public static EnterGameRoomDto of(String nickname) {
		return EnterGameRoomDto.builder()
			.nickname(nickname)
			.build();
	}
}
