package com.a608.musiq.domain.music.data;

import lombok.Getter;

@Getter
public enum Difficulty{

	EASY("EASY"),
	NORMAL("NORMAL"),
	HARD("HARD");

	private final String value;

	Difficulty(String value){
		this.value = value;
	}
}