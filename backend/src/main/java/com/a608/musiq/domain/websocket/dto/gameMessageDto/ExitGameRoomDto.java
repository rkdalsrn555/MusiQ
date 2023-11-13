package com.a608.musiq.domain.websocket.dto.gameMessageDto;

import java.util.List;

import com.a608.musiq.domain.websocket.data.MessageDtoType;
import com.a608.musiq.domain.websocket.domain.UserInfoItem;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ExitGameRoomDto {
	private MessageDtoType messageDtoType;
	private List<UserInfoItem> userInfoItems;
	private String gameRoomManagerNickname;
	private String exitedUserNickname;

	public static ExitGameRoomDto from(List<UserInfoItem> userInfoItems, String gameRoomManagerNickname,
		String nickname) {
		return ExitGameRoomDto.builder()
			.messageDtoType(MessageDtoType.EXITUSER)
			.userInfoItems(userInfoItems)
			.gameRoomManagerNickname(gameRoomManagerNickname)
			.exitedUserNickname(nickname)
			.build();
	}
}
