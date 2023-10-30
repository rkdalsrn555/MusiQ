package com.a608.musiq.domain.music.dto.responseDto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateRoomResponseDto {
	private static final int STREAK_INITIAL_NUMBER = 0;

	private int roomId;
	private int streak;
	private int problems;

	public static CreateRoomResponseDto from(int roomId, int problems) {
		return CreateRoomResponseDto.builder()
			.roomId(roomId)
			.streak(STREAK_INITIAL_NUMBER)
			.problems(problems)
			.build();
	}
}
