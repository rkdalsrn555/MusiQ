package com.a608.musiq.domain.music.dto.responseDto;

import com.a608.musiq.domain.music.domain.Music;
import com.a608.musiq.domain.music.domain.Room;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GradeAnswerResponseDto {
	private Boolean isCorrect;
	private int streak;
	private String title;
	private String singer;

	public static GradeAnswerResponseDto from(Boolean isCorrect, int streak, Music music) {
		return GradeAnswerResponseDto.builder()
			.isCorrect(isCorrect)
			.streak(streak)
			.title(music.getTitle())
			.singer(music.getSinger())
			.build();
	}

}
