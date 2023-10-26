package com.a608.musiq.domain.music.dto.responseDto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GradeAnswerResponseDto {
	private Boolean isCorrect;

	public static GradeAnswerResponseDto of(Boolean isCorrect) {
		return GradeAnswerResponseDto.builder()
			.isCorrect(isCorrect)
			.build();
	}

}
