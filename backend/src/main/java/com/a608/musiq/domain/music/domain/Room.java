package com.a608.musiq.domain.music.domain;

import java.util.List;

import com.a608.musiq.domain.music.data.Difficulty;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class Room {
	private static final int STREAK_START_NUMBER = 0;

	private List<Music> musicList;
	private Integer streak;
	private Difficulty difficulty;

	public static Room from(List<Music> musicList, Difficulty difficulty) {
		return Room.builder()
			.musicList(musicList)
			.streak(STREAK_START_NUMBER)
			.difficulty(difficulty)
			.build();
	}

	public void addStreak(Integer streak) {
		this.streak = streak + 1;
	}


}
