package com.a608.musiq.domain.websocket.service.subService;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.a608.musiq.domain.websocket.data.GameValue;
import com.a608.musiq.domain.websocket.domain.GameRoom;

@Service
public class CommonService {

	public String leaveGameRoom(UUID uuid, GameRoom gameRoom, int roomNumber) {
		// 채널 현재 게임룸에서 로비로 이동
		GameValue.leaveGameRoom(uuid, roomNumber);

		// 게임 룸에서 totalUser--, userInfoItems에서 내 uuid로 지우기
		return gameRoom.leaveUser(uuid, roomNumber);
	}

}
