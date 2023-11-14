package com.a608.musiq.domain.websocket.service.subService;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.a608.musiq.domain.websocket.data.GameValue;
import com.a608.musiq.domain.websocket.domain.GameRoom;
import com.a608.musiq.domain.websocket.domain.UserInfoItem;
import com.a608.musiq.domain.websocket.dto.responseDto.CheckPasswordResponseDto;
import com.a608.musiq.domain.websocket.dto.responseDto.EnterGameRoomResponseDto;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.EnterGameRoomDto;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.ExitGameRoomDto;

@Service
public class CommonService {

	public ExitGameRoomDto exitGameRoom(UUID uuid, GameRoom gameRoom, int roomNumber) {
		// Channel 현재 게임룸에서 로비로 이동
		GameValue.exitGameRoom(uuid, roomNumber);

		// 게임 룸에서 totalUser--, userInfoItems에서 내 uuid로 지우기
		return gameRoom.exitUser(uuid, roomNumber);
	}

	public CheckPasswordResponseDto checkPassword(GameRoom gameRoom, String password) {
		return gameRoom.checkPassword(password);
	}

	public EnterGameRoomResponseDto enterGameRoom(UUID uuid, String nickname, GameRoom gameRoom, int roomNumber) {
		GameValue.enterGameRoom(uuid, roomNumber);

		UserInfoItem userInfoItem = UserInfoItem.of(nickname);

		// 게임 룸에서 totalUser++, userInfoItems에 내 uuid 추가
		return gameRoom.enterUser(uuid, userInfoItem);
	}

	public EnterGameRoomDto enterGameRoomForPublish(GameRoom gameRoom) {
		return gameRoom.getGameRoomInformation();
	}

}
