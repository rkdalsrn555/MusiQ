package com.a608.musiq.global.exception.exception;

import com.a608.musiq.global.exception.info.GuestModeLogExceptionInfo;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GuestModeLogException extends RuntimeException {
	private final GuestModeLogExceptionInfo info;
}
