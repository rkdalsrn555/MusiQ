package com.a608.musiq.domain.websocket.service;

import com.a608.musiq.domain.websocket.data.GameValue;
import com.a608.musiq.domain.websocket.domain.GameRoom;
import com.a608.musiq.domain.websocket.dto.ChannelUserResponseDto;
import com.a608.musiq.domain.websocket.dto.ChannelUserResponseItem;
import com.a608.musiq.domain.websocket.domain.ChatMessage;
import com.a608.musiq.domain.websocket.data.MessageType;
import com.a608.musiq.domain.websocket.dto.GameRoomListResponseDto;
import jakarta.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class GameService {

    private static final Logger logger = LoggerFactory.getLogger(GameService.class);

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private ReentrantReadWriteLock lock;

    @PostConstruct
    public void init() {
        this.lock = new ReentrantReadWriteLock();
    }

    /**
     * @param accessToken
     * @param channelNo
     */
    @Async("asyncThreadPool")
    public void joinGameChannel(String accessToken, int channelNo) {
        /*
        회원 UUID 가져오기
         */
        UUID uuid = UUID.randomUUID();

        logger.info("MaxSize = {}", GameValue.getGameChannelEachMaxSize());
        logger.info("channelSize = {}", GameValue.getGameChannelSize(channelNo));

        // 정원 초과 확인
        if(GameValue.getGameChannelSize(channelNo) > GameValue.getGameChannelEachMaxSize()) {
            throw new IllegalArgumentException();
        }

        try {
            lock.writeLock().lock();
            GameValue.addUserToChannel(uuid, channelNo);
        } finally {
            lock.writeLock().unlock();
        }

    }

    /**
     * @param accessToken
     * @param channelNo
     */
    public Integer disConnectUser(String accessToken, int channelNo){
        /*
        UUID 찾기
         */
        UUID uuid = UUID.randomUUID();

        GameValue.removeUserFromChannel(uuid, channelNo);

        return 1;
    }

    /**
     * @param channelNo
     * @param chatMessage
     */
    public void sendMessage(int channelNo, ChatMessage chatMessage) {
        String destination = getDestination(channelNo);
        messagingTemplate.convertAndSend(destination, chatMessage);

        logger.info("Message send success / Destination : {}", destination);

        if(chatMessage.getMessageType() == MessageType.GAME) {
            submitAnswer(chatMessage.getMessage());
        }
    }

    /**
     * @param channelNo
     * @return
     */
    private String getDestination(int channelNo) {
        return "/topic/" + channelNo;
    }

    /**
     * @param answer
     */
    @Async("asyncThreadPool")
    public void submitAnswer(String answer) {
        /*
        게임 정답 채점 로직
         */
    }

    /**
     * @param accessToken
     * @param channelNo
     * @see ChannelUserResponseDto
     * @return
     */
    public ChannelUserResponseDto getUserList(String accessToken, int channelNo) {
        ChannelUserResponseDto channelUserResponseDto = new ChannelUserResponseDto();
        List<ChannelUserResponseItem> items = new ArrayList<>();
        ConcurrentHashMap<UUID, Integer> channel = new ConcurrentHashMap<>();
        Iterator<UUID> it = channel.keySet().iterator();

        while(it.hasNext()) {
            /*
            iterator로 nickname, userLevel 찾기
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

    /**
     * @param accessToken
     * @param channelNo
     * @see GameRoomListResponseDto
     * @return
     */
    public GameRoomListResponseDto getGameRoomList(String accessToken, int channelNo) {
        GameRoomListResponseDto gameRoomListResponseDto = new GameRoomListResponseDto();
        ConcurrentHashMap<Integer, GameRoom> gameRooms = GameValue.getGameRooms();
        Iterator<Integer> it = gameRooms.keySet().iterator();

        while(it.hasNext()) {
            int subscribeNo = it.next();
            if((subscribeNo / 1000) == channelNo){
                GameRoom gameRoom = gameRooms.get(subscribeNo);
                gameRoomListResponseDto.getGameRoomList().add(GameRoom.builder()
                        .gameRoomType(gameRoom.getGameRoomType())
                        .roomName(gameRoom.getRoomName())
                        .totalUsers(gameRoom.getTotalUsers())
                        .build());
            }
        }

        return gameRoomListResponseDto;
    }
}
