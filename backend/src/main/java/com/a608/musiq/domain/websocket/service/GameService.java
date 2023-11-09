package com.a608.musiq.domain.websocket.service;

import com.a608.musiq.domain.member.domain.MemberInfo;
import com.a608.musiq.domain.member.repository.MemberInfoRepository;
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
import com.a608.musiq.domain.websocket.dto.GameRoomListResponseItem;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.GameRoomMemberDto;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.GameRoomMemberInfo;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.ChatMessagePubDto;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.GameResultDto;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.GameResultItem;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.TimeDto;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.LeaveGameRoomDto;
import com.a608.musiq.domain.websocket.service.subService.AfterAnswerService;
import com.a608.musiq.domain.websocket.service.subService.BeforeAnswerService;
import com.a608.musiq.domain.websocket.service.subService.CommonService;
import com.a608.musiq.domain.websocket.service.subService.RoundStartService;
import com.a608.musiq.global.Util;
import com.a608.musiq.global.Util.RedisKey;
import com.a608.musiq.domain.websocket.dto.CreateGameRoomRequestDto;
import com.a608.musiq.domain.websocket.dto.CreateGameRoomResponseDto;
import com.a608.musiq.domain.websocket.dto.DisconnectSocketResponseDto;
import com.a608.musiq.domain.websocket.dto.ExitGameRoomResponse;
import com.a608.musiq.domain.websocket.dto.JoinGameRoomResponseDto;
import com.a608.musiq.global.exception.exception.MemberInfoException;
import com.a608.musiq.global.exception.exception.MultiModeException;
import com.a608.musiq.global.exception.info.MemberInfoExceptionInfo;
import com.a608.musiq.global.exception.info.MultiModeExceptionInfo;
import com.a608.musiq.global.jwt.JwtValidator;
import jakarta.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashMap;
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
    private static final int MAKING_HALF_NUMBER = 2;
    private static final int MAKING_CEIL_NUMBER = 1;
    private static final int LEVEL_SIZE = 50;

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
    public DisconnectSocketResponseDto disconnectUser(String accessToken, int channelNo) {
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
    public void sendMessage(int channelNo, ChatMessage chatMessage, String accessToken) {

        UUID uuid = jwtValidator.getData(accessToken);

        String destination = getDestination(channelNo);

        if (channelNo <= 10) {
            ChatMessagePubDto chatMessagePubDto = ChatMessagePubDto.create(MessageDtoType.CHAT,
                    chatMessage.getNickName(), chatMessage.getMessage());
            messagingTemplate.convertAndSend(destination, chatMessagePubDto);
            return;
        }

        //방 번호로 gameRoom 객체 조회
        GameRoom gameRoom = GameValue.getGameRooms().get(channelNo);

        //게임룸 타입 가져오기 - 게임 시작은 http 통신으로 민구가 WAITING에서 GAME으로 바꿔줄거임
        GameRoomType gameRoomType = gameRoom.getGameRoomType();

        PlayType playType = gameRoom.getPlayType();

        if (chatMessage.getMessage().equals("나가기")) {
            commonService.leaveGameRoom(uuid, gameRoom, channelNo);

            messagingTemplate.convertAndSend(destination,
                    LeaveGameRoomDto.of(chatMessage.getNickName()));
        }

        if (gameRoomType == GameRoomType.WAITING) {
            //게임 시작 전에 방에 대기중인 상태일 때는 그냥 바로 해당 chat pub
            ChatMessagePubDto chatMessagePubDto = ChatMessagePubDto.create(MessageDtoType.CHAT,
                    chatMessage.getNickName(), chatMessage.getMessage());
            messagingTemplate.convertAndSend(destination, chatMessagePubDto);
            return;
        }
        if (gameRoomType == GameRoomType.GAME) {

            if (playType == PlayType.ROUNDSTART) {
                //일반 채팅 해야함

            }

            if (playType == PlayType.BEFOREANSWER) {
                // 스킵 확인
                if (chatMessage.getMessage().equals(".")) {
                    // 이미 스킵 했으면 그냥 return
                    if (gameRoom.getUserInfoItems().get(uuid).getIsSkipped()) {
                        return;
                    }
                    //beforeAnswer 일때 스킵 로직 구현
                    beforeAnswerService.skip(gameRoom, uuid, destination);

                }
                // 스킵이 아닌 경우
                else {

                }
                //현재 정답

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

//        if(chatMessage.getMessageType() == MessageType.GAME) {
//            submitAnswer(chatMessage.getMessage());
//        }
    }

    public void pubMessage() {
        Map<Integer, GameRoom> rooms = GameValue.getGameRooms();
        Set<Integer> roomNums = rooms.keySet();

        for (Integer roomNum : roomNums) {

            if (roomNum <= 10) {
                continue;
            }

            GameRoom room = rooms.get(roomNum);

            // GameRoom Type 대기 상태인 경우는 처리하지 않음
            if (room.getGameRoomType() == GameRoomType.WAITING) {
                continue;
            }

            // 게임 중인 경우
            else if (room.getGameRoomType() == GameRoomType.GAME) {
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

                if (room.getTime() == 10) {
                    // 참여 인원의 점수들을 리스트로 통합
                    List<GameResultItem> gameResults = new ArrayList<>(userInfoMap.values().stream()
                            .map(item -> GameResultItem.builder()
                                    .nickname(item.getNickname())
                                    .score(item.getScore())
                                    .build()
                            ).collect(Collectors.toList()));

                    // 점수 리스트를 담아 전송
                    GameResultDto dto = GameResultDto.builder()
                            .userResults(gameResults)
                            .build();

                    messagingTemplate.convertAndSend("/topic/" + roomNum, dto);
                }

                // 시간 초 카운트
                if (room.getTime() > 0) {

                    // 타임을 객체에 담아서
                    TimeDto dto = TimeDto.builder()
                            .time(room.getTime())
                            .build();
                    messagingTemplate.convertAndSend("/topic/" + roomNum, dto);

                    room.timeDown();
                }
                // 남은 시간이 0이라면
                else {
                    List<GameRoomMemberInfo> memberInfos = new ArrayList<>();

                    // 경험치 정산
                    for (UUID memberId : userInfoMap.keySet()) {
//                        MemberInfo memberInfo = memberInfoRepository.findById(memberId)
//                                .orElseThrow(() -> new MemberInfoException(MemberInfoExceptionInfo.NOT_FOUND_MEMBER_INFO));

                        Optional<MemberInfo> memberInfoOptional = memberInfoRepository.findById(
                                memberId);
                        if (!memberInfoOptional.isPresent()) {
                            continue;
                        }

                        MemberInfo memberInfo = memberInfoOptional.get();
                        memberInfo.gainExp(
                                userInfoMap.get(memberId).getScore() * MULTI_SCORE_WEIGHT);

                        util.insertDatatoRedisSortedSet(RedisKey.RANKING.getKey(),
                                memberInfo.getNickname(),
                                memberInfo.getExp());

                        memberInfos.add(GameRoomMemberInfo.builder()
                                .nickName(memberInfo.getNickname())
                                .level((int) (memberInfo.getExp() / LEVEL_SIZE))
                                .build());
                    }

                    // 다음 판을 위한 세팅
                    room.initializeRoom();

                    // 클라이언트에게 대기방 관련 정보 전달 해줘야 함
                    GameRoomMemberDto dto = GameRoomMemberDto.builder()
                            .memberInfos(memberInfos)
                            .build();
                    messagingTemplate.convertAndSend("/topic/" + roomNum, dto);
                }
            }
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
     * @return
     * @see ChannelUserResponseDto
     */
    public ChannelUserResponseDto getUserList(String accessToken, int channelNo) {
        ChannelUserResponseDto channelUserResponseDto = new ChannelUserResponseDto();
        List<ChannelUserResponseItem> items = new ArrayList<>();
        ConcurrentHashMap<UUID, Integer> channel = GameValue.getGameChannel(channelNo);
        Iterator<UUID> it = channel.keySet().iterator();

        while (it.hasNext()) {
            UUID uuid = it.next();
            MemberInfo memberInfo = memberInfoRepository.findById(uuid)
                    .orElseThrow(() -> new MemberInfoException(
                            MemberInfoExceptionInfo.NOT_FOUND_MEMBER_INFO));

            items.add(ChannelUserResponseItem.builder()
                    .nickname(memberInfo.getNickname())
                    .userLevel((int) (memberInfo.getExp() / 50) + 1)
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
        ConcurrentHashMap<Integer, GameRoom> gameRooms = GameValue.getGameRooms();
        Iterator<Integer> it = gameRooms.keySet().iterator();
        List<GameRoomListResponseItem> gameRoomListResponseItems = new ArrayList<>();

        while (it.hasNext()) {
            int subscribeNo = it.next();
            if ((subscribeNo / 1000) == channelNo) {
                GameRoom gameRoom = gameRooms.get(subscribeNo);
                MemberInfo roomManager = memberInfoRepository.findById(
                                gameRoom.getRoomManagerUUID())
                        .orElseThrow(() -> new MemberInfoException(
                                MemberInfoExceptionInfo.NOT_FOUND_MEMBER_INFO));

                gameRoomListResponseItems.add(GameRoomListResponseItem.builder()
                        .roomTitle(gameRoom.getRoomName())
                        .roomManager(roomManager.getNickname())
                        .currentMembers(gameRoom.getTotalUsers())
                        .roomNumber(gameRoom.getRoomNo())
                        .isPrivate(!gameRoom.getPassword().equals(""))
                        .years(gameRoom.getYear())
                        .build());
            }
        }

        return GameRoomListResponseDto.builder()
                .rooms(gameRoomListResponseItems)
                .build();
    }

    public CreateGameRoomResponseDto makeGameRoom(String accessToken,
            CreateGameRoomRequestDto createGameRoomRequestDto) {
        UUID uuid = jwtValidator.getData(accessToken);
        String nickname = memberInfoRepository.findById(uuid).orElseThrow(
                        () -> new MemberInfoException(MemberInfoExceptionInfo.NOT_FOUND_MEMBER_INFO))
                .getNickname();
        GameRoom gameRoom = new GameRoom();
        ConcurrentHashMap<Integer, GameRoom> gameRooms = GameValue.getGameRooms();

        Iterator<Integer> it = gameRooms.keySet().iterator();
        int curRoomIndex = GameValue.getChannel(createGameRoomRequestDto.getChannelNo())
                .getMinimumEmptyRoomNo();

        /*
        GameRoom 생성 후 Map에 추가
         */
        Map<UUID, UserInfoItem> userInfoItems = new HashMap<>();
        userInfoItems.put(uuid, UserInfoItem.builder()
                .nickname(nickname)
                .score(0.0)
                .isSkipped(false)
                .build());

        GameValue.getGameRooms().put(curRoomIndex, GameRoom.builder()
                .roomNo(curRoomIndex)
                .roomName(createGameRoomRequestDto.getRoomName())
                .password(createGameRoomRequestDto.getPassword())
                .roomManagerUUID(uuid)
                .numberOfProblems(createGameRoomRequestDto.getQuizAmount())
                .year(createGameRoomRequestDto.getMusicYear())
                .totalUsers(1)
                .userInfoItems(userInfoItems)
                .build());

        logger.info("Create GameRoom Successful");

        return CreateGameRoomResponseDto.builder()
                .gameRoomNo(curRoomIndex)
                .roomName(createGameRoomRequestDto.getRoomName())
                .password(createGameRoomRequestDto.getPassword())
                .musicYear(createGameRoomRequestDto.getMusicYear())
                .quizAmount(createGameRoomRequestDto.getQuizAmount())
                .build();
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
