package com.a608.musiq.global.exception.info;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public enum MemberExceptionInfo {
	NOT_FOUND_MEMBER(HttpStatus.NOT_FOUND, 1000, "사용자를 찾을 수 없습니다."),
	INVALID_LOGIN_TYPE(HttpStatus.BAD_REQUEST, 1001, "유효하지 않은 로그인 타입입니다."),
	DUPLICATED_LONGIN_ID(HttpStatus.BAD_REQUEST, 1002, "중복된 아이디 입니다."),
	DUPLICATED_NICKNAME(HttpStatus.BAD_REQUEST, 1003, "중복된 닉네임 입니다.");

	private final HttpStatus status;
	private final Integer code;
	private final String message;

	MemberExceptionInfo(HttpStatus status, Integer code, String message) {
		this.status = status;
		this.code = code;
		this.message = message;
	}
}
