package com.a608.musiq.domain.websocket.service;

import com.a608.musiq.domain.member.domain.MemberInfo;
import com.a608.musiq.domain.member.repository.MemberInfoRepository;
import com.a608.musiq.domain.websocket.data.GameValue;
import com.a608.musiq.domain.websocket.domain.GameRoom;
import com.a608.musiq.domain.websocket.dto.AllChannelSizeResponseDto;
import com.a608.musiq.domain.websocket.dto.ChannelUserResponseDto;
import com.a608.musiq.domain.websocket.dto.ChannelUserResponseItem;
import com.a608.musiq.domain.websocket.domain.ChatMessage;
import com.a608.musiq.domain.websocket.data.MessageType;
import com.a608.musiq.domain.websocket.dto.CreateGameRoomRequestDto;
import com.a608.musiq.domain.websocket.dto.CreateGameRoomResponseDto;
import com.a608.musiq.domain.websocket.dto.DisconnectSocketResponseDto;
import com.a608.musiq.domain.websocket.dto.ExitGameRoomResponse;
import com.a608.musiq.domain.websocket.dto.GameRoomListResponseDto;
import com.a608.musiq.domain.websocket.dto.JoinGameRoomResponseDto;
import com.a608.musiq.global.exception.exception.MemberInfoException;
import com.a608.musiq.global.exception.exception.MultiModeException;
import com.a608.musiq.global.exception.info.MemberInfoExceptionInfo;
import com.a608.musiq.global.exception.info.MultiModeExceptionInfo;
import com.a608.musiq.global.jwt.JwtValidator;
import jakarta.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GameService {

    private static final Logger logger = LoggerFactory.getLogger(GameService.class);

    private final JwtValidator jwtValidator;

    private final MemberInfoRepository memberInfoRepository;

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
        UUID uuid = jwtValidator.getData(accessToken);

        logger.info("MaxSize = {}", GameValue.getGameChannelEachMaxSize());
        logger.info("CurrentChannelSize = {}", GameValue.getGameChannelSize(channelNo));

        // 정원 초과 확인
        if(GameValue.getGameChannelSize(channelNo) > GameValue.getGameChannelEachMaxSize()) {
            throw new MultiModeException(MultiModeExceptionInfo.INVALID_JOIN_REQUEST);
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
     * @see AllChannelSizeResponseDto
     * @return
     */
    public AllChannelSizeResponseDto getAllChannelSizeList(String accessToken) {
        AllChannelSizeResponseDto allChannelSizeResponseDto = new AllChannelSizeResponseDto();
        List<Integer> list = new ArrayList<>();

        for(int i = 1; i <= GameValue.getGameChannelMaxSize(); i++) {
            list.add(GameValue.getGameChannelSize(i));
        }

        allChannelSizeResponseDto.setChannelSizes(list);
        return allChannelSizeResponseDto;
    }

    /**
     * @param accessToken
     * @param channelNo
     */
    public DisconnectSocketResponseDto disconnectUser(String accessToken, int channelNo){
        UUID uuid = jwtValidator.getData(accessToken);

        /*
        로비에서 정상적인 루트로 나가는 사람이 아닌 게임 룸에서 강제로 퇴장 하는 유저 고려해야 함
        - 채널에서 지우고 게임룸에서 지우고 Pub 해줘야함
         */

        GameValue.removeUserFromChannel(uuid, channelNo);

        return DisconnectSocketResponseDto.builder()
                .channelNo(channelNo)
                .build();
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
            UUID uuid = it.next();
            MemberInfo memberInfo = memberInfoRepository.findById(uuid).orElseThrow(() -> new MemberInfoException(
                    MemberInfoExceptionInfo.NOT_FOUND_MEMBER_INFO));

            items.add(ChannelUserResponseItem.builder()
                            .nickname(memberInfo.getNickname())
                            .userLevel((int)(memberInfo.getExp() / 50))
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
//                gameRoomListResponseDto.getRooms().add(GameRoom.builder()
//                        .gameRoomType(gameRoom.getGameRoomType())
//                        .roomName(gameRoom.getRoomName())
//                        .totalUsers(gameRoom.getTotalUsers())
//                        .build());
            }
        }

        return gameRoomListResponseDto;
    }

    public CreateGameRoomResponseDto makeGameRoom(String accessToken, CreateGameRoomRequestDto createGameRoomRequestDto) {
        CreateGameRoomResponseDto createGameRoomResponseDto = new CreateGameRoomResponseDto();
        GameRoom gameRoom = new GameRoom();
        ConcurrentHashMap<Integer, GameRoom> gameRooms = GameValue.getGameRooms();

        Iterator<Integer> it = gameRooms.keySet().iterator();
        int curRoomIdx = createGameRoomRequestDto.getChannelNo() * 1000;
        while(it.hasNext()) {
            int subscribeNo = it.next();
            if((subscribeNo / 1000) == createGameRoomRequestDto.getChannelNo()) curRoomIdx++;
        }
        createGameRoomResponseDto.setGameRoomNo(curRoomIdx + 1);
        createGameRoomResponseDto.setRoomName(createGameRoomRequestDto.getRoomName());
        createGameRoomResponseDto.setPassword(createGameRoomRequestDto.getPassword());
        createGameRoomResponseDto.setMusicYearItems(createGameRoomRequestDto.getMusicYearItems());
        createGameRoomResponseDto.setQuizAmount(createGameRoomRequestDto.getQuizAmount());
        /*
        GameRoom 생성 후 Map에 추가
         */

        return createGameRoomResponseDto;
    }

    public JoinGameRoomResponseDto moveGameRoom(String accessToken, int channelNo) {
        UUID uuid = jwtValidator.getData(accessToken);



        return null;
    }

    public ExitGameRoomResponse moveLobby(String accessToken, int channelNo) {
        UUID uuid = jwtValidator.getData(accessToken);
        int lobbyNo = GameValue.getChannelNo(uuid, channelNo);
        GameValue.removeUserFromChannel(uuid, channelNo);
        GameValue.addUserToChannel(uuid, lobbyNo);

        return ExitGameRoomResponse.builder()
                .destinationNo(lobbyNo)
                .build();
    }

}
