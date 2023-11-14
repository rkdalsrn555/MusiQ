package com.a608.musiq.domain.websocket.dto.requestDto;

import lombok.Getter;

@Getter
public class CheckPasswordRequestDto {
	private int channelNo;
	private String password;
}
