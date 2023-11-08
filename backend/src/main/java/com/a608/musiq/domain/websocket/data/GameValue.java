package com.a608.musiq.domain.websocket.data;

import com.a608.musiq.domain.websocket.domain.GameRoom;
import jakarta.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import lombok.Getter;
import org.springframework.stereotype.Component;

@Component

public class GameValue {

    /**
     * List index No :
     *          0 ~ 9 = 1 ~ 10채널
     *
     * UUID 사용자 식별
     *
     * Integer 구독 번호 :
     *          1 ~ 10 = 채널
     *          1001 ~ 1999 = 1번 채널 게임 방
     *          2001 ~ 2999 = 2번 채널 게임 방
     *          ...
     *          10001 ~ 10999 = 10번 채널 게임 방
     */
    private static List<ConcurrentHashMap<UUID, Integer>> gameChannels = new ArrayList<>();
    private static ConcurrentHashMap<Integer, GameRoom> gameRooms = new ConcurrentHashMap<>();
    private final int CHANNEL_MAX_SIZE = 10;
    private static final int CHANNEL_EACH_MAX_SIZE = 100;

    @PostConstruct
    public void initValues() {
        for(int i = 0; i < CHANNEL_MAX_SIZE; i++) gameChannels.add(new ConcurrentHashMap<>());
    }

    // channelNo 채널 접속자 수 조회
    public static int getGameChannelSize(int channelNo) {
        return gameChannels.get(channelNo - 1).size();
    }

    public static int getGameChannelEachMaxSize() {
        return CHANNEL_EACH_MAX_SIZE;
    }

    // 채널 ConcurrentHashMap 가져오기
    public static ConcurrentHashMap<UUID, Integer> getGameChannel(int channelNo) {
        return gameChannels.get(channelNo);
    }

    //
    public static ConcurrentHashMap<Integer, GameRoom> getGameRooms() {
        return gameRooms;
    }

    // 채널에 유저 추가
    public static void addUserToChannel(UUID userUUID, int channelNo) {
        ConcurrentHashMap<UUID, Integer> channel = gameChannels.get(channelNo - 1);
        channel.put(userUUID, channelNo);
    }

    // 채널에서 유저 제거
    public static void removeUserFromChannel(UUID userUUID, int channelNo) {
        ConcurrentHashMap<UUID, Integer> channel = gameChannels.get(channelNo - 1);
        channel.remove(userUUID);
    }



}
