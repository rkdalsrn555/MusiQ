package com.a608.musiq.domain.websocket.service;

import com.a608.musiq.domain.websocket.dto.ChannelUserResponseDto;
import com.a608.musiq.domain.websocket.dto.ChannelUserResponseItem;
import com.a608.musiq.domain.websocket.dto.GameMessage;
import jakarta.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class GameService {


    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private ReentrantReadWriteLock lock;

    @PostConstruct
    public void init() {
        this.lock = new ReentrantReadWriteLock();
    }

    @Async("asyncThreadPool")
    public void joinGameChannel(String accessToken, int channelNo) {
        /*
        회원 UUID 가져오기
         */
        UUID uuid = UUID.randomUUID();

        // 정원 초과 확인
        if(GameValues.getGameChannelSize(channelNo) < GameValues.getGameChannelEachSize()) {
            throw new IllegalArgumentException();
        }

        try {
            lock.writeLock().lock();
            GameValues.getGameChannel(channelNo).put(uuid, channelNo);
        } finally {
            lock.writeLock().unlock();
        }

    }

    /**
     *
     * @param channelNo
     * @param gameMessage
     */
    public void sendMessage(int channelNo, GameMessage gameMessage) {
        String destination = getDestination(channelNo);
        messagingTemplate.convertAndSend(destination, gameMessage);
    }

    /**
     *
     * @param channelNo
     * @return
     */
    private String getDestination(int channelNo) {
        return "/sub/game/" + channelNo;
    }

    public ChannelUserResponseDto getUserList(String accessToken, int channelNo) {


        ChannelUserResponseDto channelUserResponseDto = new ChannelUserResponseDto();
        List<ChannelUserResponseItem> items = new ArrayList<>();
        ConcurrentHashMap<UUID, Integer> channel = new ConcurrentHashMap<>();
        Iterator<UUID> it = channel.keySet().iterator();

        while(it.hasNext()) {
            /*
            nickname, userLevel 찾기
            */
            String nickname = "";
            int userLevel = 0;
            items.add(ChannelUserResponseItem.builder()
                            .nickname(nickname)
                            .userLevel(userLevel)
                            .build());
        }

        channelUserResponseDto.setChannelUserResponseItems(items);

        return channelUserResponseDto;
    }

}
