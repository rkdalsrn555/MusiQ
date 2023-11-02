package com.a608.musiq.domain.music.dao;

import lombok.Getter;

@Getter
public class FindAnswerDao {

	private String title;

	public FindAnswerDao(String title) {
		this.title = title;
	}
}
