package com.a608.musiq.global.exception.info;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum MultiModeExceptionInfo {
    INVALID_JOIN_REQUEST(HttpStatus.BAD_REQUEST, 1600, "정원 초과인 채널입니다."),
    OUT_OF_ROOM_NUMBER(HttpStatus.BAD_REQUEST, 1601, "현재 생성할 수 있는 방이 없습니다."),
    FULL_ROOM_USER(HttpStatus.BAD_REQUEST, 1602, "정원 초과인 방입니다."),
    ALREADY_STARTED_ROOM(HttpStatus.BAD_REQUEST, 1603, "이미 시작한 방입니다.");

    private final HttpStatus status;
    private final Integer code;
    private final String message;

    MultiModeExceptionInfo(HttpStatus status, Integer code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
