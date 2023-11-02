package com.a608.musiq.domain.music.domain;

import java.util.HashMap;
import java.util.Map;

import lombok.Getter;

@Getter
public class RoomManager {
	private static final Integer ROOM_INITIAL_NUMBER = 0;

	private int currentRoomNumber;
	private Map<Integer, Room> rooms;

	public RoomManager() {
		this.currentRoomNumber = ROOM_INITIAL_NUMBER;
		this.rooms = new HashMap<>();
	}

	public int addRoom(Room room) {
		rooms.put(currentRoomNumber, room);
		return currentRoomNumber++;
	}

}
