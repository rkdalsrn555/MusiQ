package com.a608.musiq.global.exception.info;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public enum MusicExceptionInfo {
	NOT_FOUND_MUSIC(HttpStatus.NOT_FOUND, 1200, "노래를 찾을 수 없습니다.");

	private final HttpStatus status;
	private final Integer code;
	private final String message;

	MusicExceptionInfo(HttpStatus status, Integer code, String message) {
		this.status = status;
		this.code = code;
		this.message = message;
	}
}
