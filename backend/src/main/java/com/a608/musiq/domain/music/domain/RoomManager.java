package com.a608.musiq.domain.music.domain;

import java.util.HashMap;
import java.util.Map;

import lombok.Getter;

@Getter
public class RoomManager {
	private Map<Integer, Room> rooms;

	public RoomManager() {
		this.rooms = new HashMap<>();
	}

	public void addRoom(int roomId, Room room) {
		rooms.put(roomId, room);
	}

}
