package com.a608.musiq.domain.websocket.service;

import com.a608.musiq.domain.member.domain.MemberInfo;
import com.a608.musiq.domain.member.repository.MemberInfoRepository;
import com.a608.musiq.domain.websocket.data.GameRoomType;
import com.a608.musiq.domain.websocket.data.GameValue;
import com.a608.musiq.domain.websocket.data.PlayType;
import com.a608.musiq.domain.websocket.domain.GameRoom;
import com.a608.musiq.domain.websocket.dto.AllChannelSizeResponseDto;
import com.a608.musiq.domain.websocket.dto.ChannelUserResponseDto;
import com.a608.musiq.domain.websocket.dto.ChannelUserResponseItem;
import com.a608.musiq.domain.websocket.domain.ChatMessage;
import com.a608.musiq.domain.websocket.data.MessageType;
import com.a608.musiq.domain.websocket.dto.GameRoomListResponseDto;
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
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GameService {

    private static final Logger logger = LoggerFactory.getLogger(GameService.class);

    private final JwtValidator jwtValidator;

    private final MemberInfoRepository memberInfoRepository;

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
    public Integer disConnectUser(String accessToken, int channelNo){
        UUID uuid = jwtValidator.getData(accessToken);

        /*
        로비에서 정상적인 루트로 나가는 사람이 아닌 게임 룸에서 강제로 퇴장 하는 유저 고려해야 함
         */

        GameValue.removeUserFromChannel(uuid, channelNo);

        return 1;
    }

    /**
     * @param channelNo
     * @param chatMessage
     */
    public void sendMessage(int channelNo, ChatMessage chatMessage) {
        String destination = getDestination(channelNo);
        //프론트가 보낸 메시지에서 uuid 추출
        UUID uuid = UUID.fromString(chatMessage.getUserUUID());

        //uuid를 가지고 해당 사용자가 속한 채널 가져오기
        ConcurrentHashMap<UUID, Integer> channel = GameValue.getGameChannel(channelNo);
        //방 번호 가져오기 (topic 번호 조회)
        Integer roomNumber =channel.get(uuid);
        //방 번호로 gameRoom 객체 조회
        GameRoom gameRoom =GameValue.getGameRooms().get(roomNumber);




        //게임룸 타입 가져오기 - 게임 시작은 http 통신으로 민구가 WAITING에서 GAME으로 바꿔줄거임
        GameRoomType gameRoomType = gameRoom.getGameRoomType();

        PlayType playType = gameRoom.getPlayType();
        if(gameRoomType == GameRoomType.WAITING){
            //게임 시작 전에 방에 대기중인 상태일 때는 그냥 바로 해당 chat pub
            messagingTemplate.convertAndSend(destination, chatMessage);
            return;
        }
        if(gameRoomType == GameRoomType.GAME){


            if(playType == PlayType.ROUNDSTART){
                //게임 시작했고 지금 1라운드인 경우
                if(gameRoom.getRound() == 1) {

                }
            }

            if (playType == PlayType.BEFOREANSWER){

            }

            if(playType == PlayType.AFTERANSWER){

            }
        }



        //게임 타입이 뭐냐에 따라 맞는 로직 처리







        //백단 로직 처리


        //스킵처리

        //따로 메서드하나 더 만들어서 크론에 돌려서




        //pub을 위한 클래스 값 채우기

//        messagingTemplate.convertAndSend(destination, chatMessage);

        //if(정답일떄) -> 정답자랑

        logger.info("Message send success / Destination : {}", destination);
//
//        if(chatMessage.getMessageType() == MessageType.GAME) {
//            submitAnswer(chatMessage.getMessage());
//        }
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
