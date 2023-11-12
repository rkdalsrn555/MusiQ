package com.a608.musiq.domain.websocket.service.subService;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.a608.musiq.domain.websocket.data.GameValue;
import com.a608.musiq.domain.websocket.domain.GameRoom;
import com.a608.musiq.domain.websocket.domain.UserInfoItem;

@Service
public class CommonService {

	public String leaveGameRoom(UUID uuid, GameRoom gameRoom, int roomNumber) {
		// Channel 현재 게임룸에서 로비로 이동
		GameValue.leaveGameRoom(uuid, roomNumber);

		// 게임 룸에서 totalUser--, userInfoItems에서 내 uuid로 지우기
		return gameRoom.leaveUser(uuid, roomNumber);
	}

	public String enterGameRoom(UUID uuid, String nickname, GameRoom gameRoom, int roomNumber) {
		GameValue.enterGameRoom(uuid, roomNumber);

		UserInfoItem userInfoItem = UserInfoItem.of(nickname);

		// 게임 룸에서 totalUser++, userInfoItems에 내 uuid 추가
		return gameRoom.enterUser(uuid, userInfoItem);
	}

}
