package com.a608.musiq.global.exception.info;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum MultiModeExceptionInfo {
    INVALID_JOIN_REQUEST(HttpStatus.BAD_REQUEST, 1600, "정원 초과인 채널입니다."),
    OUT_OF_ROOM_NUMBER(HttpStatus.BAD_REQUEST, 1601, "현재 생성할 수 있는 방이 없습니다.");

    private final HttpStatus status;
    private final Integer code;
    private final String message;

    MultiModeExceptionInfo(HttpStatus status, Integer code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
