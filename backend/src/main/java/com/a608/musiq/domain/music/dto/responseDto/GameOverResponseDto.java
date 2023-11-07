package com.a608.musiq.domain.music.dto.responseDto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GameOverResponseDto {
	private int round;

	public static GameOverResponseDto of(int round) {
		return GameOverResponseDto.builder()
			.round(round)
			.build();
	}
}
