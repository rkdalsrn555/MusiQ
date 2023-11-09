package com.a608.musiq.domain.websocket.service;

import com.a608.musiq.domain.member.domain.MemberInfo;
import com.a608.musiq.domain.member.repository.MemberInfoRepository;
import com.a608.musiq.domain.music.domain.Room;
import com.a608.musiq.domain.websocket.data.GameRoomType;
import com.a608.musiq.domain.websocket.data.GameValue;
import com.a608.musiq.domain.websocket.data.MessageDtoType;
import com.a608.musiq.domain.websocket.data.PlayType;
import com.a608.musiq.domain.websocket.domain.GameRoom;
import com.a608.musiq.domain.websocket.domain.UserInfoItem;
import com.a608.musiq.domain.websocket.dto.AllChannelSizeResponseDto;
import com.a608.musiq.domain.websocket.dto.ChannelUserResponseDto;
import com.a608.musiq.domain.websocket.dto.ChannelUserResponseItem;
import com.a608.musiq.domain.websocket.domain.ChatMessage;
import com.a608.musiq.domain.websocket.dto.GameRoomListResponseDto;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.AfterAnswerDto;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.GameResult;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.GameResultItem;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.TotalScoreDto;
import com.a608.musiq.domain.websocket.service.subService.AfterAnswerService;
import com.a608.musiq.domain.websocket.service.subService.BeforeAnswerService;
import com.a608.musiq.domain.websocket.service.subService.CommonService;
import com.a608.musiq.domain.websocket.service.subService.RoundStartService;
import com.a608.musiq.global.Util;
import com.a608.musiq.global.Util.RedisKey;
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
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import java.util.stream.Collectors;
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
    private final Util util;
    private final MemberInfoRepository memberInfoRepository;

    private final RoundStartService roundStartService;
    private final BeforeAnswerService beforeAnswerService;
    private final AfterAnswerService afterAnswerService;
    private final CommonService commonService;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private ReentrantReadWriteLock lock;

    private static final int MULTI_SCORE_WEIGHT = 10;

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
        if (GameValue.getGameChannelSize(channelNo) > GameValue.getGameChannelEachMaxSize()) {
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
     * @return
     * @see AllChannelSizeResponseDto
     */
    public AllChannelSizeResponseDto getAllChannelSizeList(String accessToken) {
        AllChannelSizeResponseDto allChannelSizeResponseDto = new AllChannelSizeResponseDto();
        List<Integer> list = new ArrayList<>();

        for (int i = 1; i <= GameValue.getGameChannelMaxSize(); i++) {
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

        //방 번호로 gameRoom 객체 조회
        GameRoom gameRoom = GameValue.getGameRooms().get(channelNo);

        //게임룸 타입 가져오기 - 게임 시작은 http 통신으로 민구가 WAITING에서 GAME으로 바꿔줄거임
        GameRoomType gameRoomType = gameRoom.getGameRoomType();

        PlayType playType = gameRoom.getPlayType();

        if (gameRoomType == GameRoomType.WAITING) {
            //게임 시작 전에 방에 대기중인 상태일 때는 그냥 바로 해당 chat pub
            messagingTemplate.convertAndSend(destination, chatMessage);
            return;
        }
        if (gameRoomType == GameRoomType.GAME) {
            // 스킵 확인
            if(chatMessage.getMessage().equals(".")) {
                // 스킵 로직
            }

            if (playType == PlayType.ROUNDSTART) {
                //게임 시작했고 지금 1라운드인 경우
                if (gameRoom.getRound() == 1) {
                    gameRoom.setMultiModeProblems(
                        roundStartService.makeMutiProblemList(gameRoom.getNumberOfProblems(),gameRoom.getYear()));
                }
            }

            if (playType == PlayType.BEFOREANSWER) {
                //현재 라운드

                //현재 정답

                //가수 힌트
                if(gameRoom.getTime() == 30){

                }
                //초성 힌트
                if(gameRoom.getTime() == 20){

                }
                //10초로 바꾸고 정답 표시, PlayType을 AFTERANSWER 로 변경, skipVote = 0 으로 바꾸기, userInfoItem의 isSkipped 모두 false로 바꾸기
                if(gameRoom.getTime() == 0){
                    beforeAnswerService.finishBeforeAnswerWithNoSkipAndNoAnswer(gameRoom);
                }
                // 스킵 로직
                if(chatMessage.getMessage().equals(".")){
                    //과반수 일때 처리

                }
                //정답인 경우
//                if()

                //정답이 아닌 경우




            }

            if (playType == PlayType.AFTERANSWER) {

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

    public void pubMessage(){
        Map<Integer, GameRoom> rooms = GameValue.getGameRooms();
        Set<Integer> roomNums = rooms.keySet();

        for(Integer roomNum : roomNums) {

            if(roomNum <= 10) continue;

            GameRoom room = rooms.get(roomNum);

            // GameRoom Type 대기 상태인 경우는 처리하지 않음
            if(room.getGameRoomType() == GameRoomType.WAITING) continue;

            // 게임 중인 경우
            else if(room.getGameRoomType() == GameRoomType.GAME) {
                switch (room.getPlayType()) {

                    case ROUNDSTART:
                        roundStartService.doRoundStart(roomNum, room);
                        break;
                    case BEFOREANSWER:
                        System.out.println("before answer");
                        break;
                    case AFTERANSWER:
                        afterAnswerService.doAfterAnswer(roomNum, room);
                        break;
                }
            }

            // 게임이 종료되었다면
            else {
                Map<UUID, UserInfoItem> userInfoMap = room.getUserInfoItems();

                List<GameResultItem> gameResult = new ArrayList<>(userInfoMap.values().stream()
                        .map(item-> GameResultItem.builder()
                                .nickname(item.getNickname())
                                .score(item.getScore())
                                .build()
                        ).collect(Collectors.toList()));

                TotalScoreDto dto = TotalScoreDto.builder()
                        .type(MessageDtoType.GAMEOVER)
                        .time(room.getTime())
                        .gameResult(gameResult)
                        .build();

                messagingTemplate.convertAndSend("/topic/"+roomNum, dto);

                if(room.getTime() > 0) {
                    room.timeDown();
                }
                else {
                    
                    // 경험치 정산
                    for(UUID memberId : userInfoMap.keySet()) {
//                        MemberInfo memberInfo = memberInfoRepository.findById(memberId)
//                                .orElseThrow(() -> new MemberInfoException(MemberInfoExceptionInfo.NOT_FOUND_MEMBER_INFO));

                        Optional<MemberInfo> memberInfoOptional = memberInfoRepository.findById(memberId);
                        if(!memberInfoOptional.isPresent()) continue;

                        MemberInfo memberInfo = memberInfoOptional.get();
                        memberInfo.gainExp(userInfoMap.get(memberId).getScore() * MULTI_SCORE_WEIGHT);

                        util.insertDatatoRedisSortedSet(RedisKey.RANKING.getKey(), memberInfo.getNickname(), memberInfo.getExp());
                    }

                    // 다음 판을 위한 세팅
                    room.changeGameRoomType(GameRoomType.WAITING);
                    room.changePlayType(PlayType.ROUNDSTART);
                    room.setTime(5);
                }
            }

        }
        //전체를 다 돌면서
        //GameRoomType 이 GAME 일때
        //타임을 --
        //PlayType 이 BEFOREANSWER 일때
        //  타임이 30초면 가수힌트
        //  타임이 20초면 초성힌트
        //
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
     * @return
     * @see ChannelUserResponseDto
     */
    public ChannelUserResponseDto getUserList(String accessToken, int channelNo) {
        ChannelUserResponseDto channelUserResponseDto = new ChannelUserResponseDto();
        List<ChannelUserResponseItem> items = new ArrayList<>();
        ConcurrentHashMap<UUID, Integer> channel = new ConcurrentHashMap<>();
        Iterator<UUID> it = channel.keySet().iterator();

        while (it.hasNext()) {
            UUID uuid = it.next();
            MemberInfo memberInfo = memberInfoRepository.findById(uuid)
                .orElseThrow(() -> new MemberInfoException(
                    MemberInfoExceptionInfo.NOT_FOUND_MEMBER_INFO));

            items.add(ChannelUserResponseItem.builder()
                .nickname(memberInfo.getNickname())
                .userLevel((int) (memberInfo.getExp() / 50))
                .build());
        }

        channelUserResponseDto.setChannelUserResponseItems(items);

        return channelUserResponseDto;
    }

    /**
     * @param accessToken
     * @param channelNo
     * @return
     * @see GameRoomListResponseDto
     */
    public GameRoomListResponseDto getGameRoomList(String accessToken, int channelNo) {
        GameRoomListResponseDto gameRoomListResponseDto = new GameRoomListResponseDto();
        ConcurrentHashMap<Integer, GameRoom> gameRooms = GameValue.getGameRooms();
        Iterator<Integer> it = gameRooms.keySet().iterator();

        while (it.hasNext()) {
            int subscribeNo = it.next();
            if ((subscribeNo / 1000) == channelNo) {
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
