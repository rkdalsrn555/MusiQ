package com.a608.musiq.domain.websocket.service;

import com.a608.musiq.domain.member.domain.MemberInfo;
import com.a608.musiq.domain.member.repository.MemberInfoRepository;
import com.a608.musiq.domain.websocket.data.GameRoomType;
import com.a608.musiq.domain.websocket.data.GameValue;
import com.a608.musiq.domain.websocket.data.MessageDtoType;
import com.a608.musiq.domain.websocket.data.MessageType;
import com.a608.musiq.domain.websocket.data.PlayType;
import com.a608.musiq.domain.websocket.domain.Channel;
import com.a608.musiq.domain.websocket.domain.GameRoom;
import com.a608.musiq.domain.websocket.domain.UserInfoItem;
import com.a608.musiq.domain.websocket.dto.AllChannelSizeResponseDto;
import com.a608.musiq.domain.websocket.dto.ChannelUserResponseDto;
import com.a608.musiq.domain.websocket.dto.ChannelUserResponseItem;
import com.a608.musiq.domain.websocket.domain.ChatMessage;
import com.a608.musiq.domain.websocket.dto.GameRoomListResponseDto;
import com.a608.musiq.domain.websocket.dto.GameRoomListResponseItem;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.BeforeAnswerCorrectDto;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.EnterGameRoomDto;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.GameRoomPubDto;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.GameRoomMemberInfo;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.ChatMessagePubDto;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.GameResultDto;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.GameResultItem;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.GameStartPubDto;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.TimeDto;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.ExitGameRoomDto;
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
import java.util.Arrays;
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
import org.springframework.messaging.simp.SimpMessageSendingOperations;
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
    private SimpMessageSendingOperations messagingTemplate;

    private ReentrantReadWriteLock lock;

    private static final int MULTI_SCORE_WEIGHT = 10;
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

        return DisconnectSocketResponseDto.builder().channelNo(channelNo).build();
    }

    /**
     * @param channelNo
     * @param chatMessage
     */
    public void sendMessage(int channelNo, ChatMessage chatMessage, String accessToken) {

        UUID uuid = jwtValidator.getData(accessToken);

        String destination = getDestination(channelNo);

        logger.info("nickname : {} , message : {}", chatMessage.getNickname(),
                chatMessage.getMessage());

        if (channelNo <= 10) {
            ChatMessagePubDto chatMessagePubDto = ChatMessagePubDto.create(MessageDtoType.CHAT,
                    chatMessage.getNickname(), chatMessage.getMessage());
            messagingTemplate.convertAndSend(destination, chatMessagePubDto);
            return;
        }

        //방 번호로 gameRoom 객체 조회
        GameRoom gameRoom = GameValue.getGameRooms().get(channelNo);

        // 게임이 시작될 때의 로직
        if (chatMessage.getMessageType().equals(MessageType.GAMESTART.toString())) {

            // 게임 방 타입을 Game으로 설정
            gameRoom.changeGameRoomType(GameRoomType.GAME);

            // 플레이 타입을 RoundStart로 설정
            gameRoom.setPlayType(PlayType.ROUNDSTART);

            // 문제 출제
            gameRoom.setMultiModeProblems(
                    roundStartService.makeMutiProblemList(gameRoom.getNumberOfProblems(),
                            gameRoom.getYear()));

            // 게임 시작 pub
            messagingTemplate.convertAndSend(destination, new GameStartPubDto());
            return;
        }

        //게임룸 타입 가져오기 - 게임 시작은 http 통신으로 민구가 WAITING에서 GAME으로 바꿔줄거임
        GameRoomType gameRoomType = gameRoom.getGameRoomType();

        if (gameRoomType == GameRoomType.WAITING || gameRoomType == GameRoomType.END) {
            //일반 채팅
            ChatMessagePubDto chatMessagePubDto = ChatMessagePubDto.create(MessageDtoType.CHAT,
                    chatMessage.getNickname(), chatMessage.getMessage());
            messagingTemplate.convertAndSend(destination, chatMessagePubDto);
            return;
        }
        if (gameRoomType == GameRoomType.GAME) {
            PlayType playType = gameRoom.getPlayType();
            if (playType == PlayType.ROUNDSTART) {
                //일반 채팅
                ChatMessagePubDto chatMessagePubDto = ChatMessagePubDto.create(MessageDtoType.CHAT,
                        chatMessage.getNickname(), chatMessage.getMessage());
                messagingTemplate.convertAndSend(destination, chatMessagePubDto);
                return;

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
                    return;

                }
                // 스킵이 아닌 경우
                else {
                    //먼저 일반채팅으로 pub 부터 함
                    ChatMessagePubDto chatMessagePubDto = ChatMessagePubDto.create(
                            MessageDtoType.CHAT, chatMessage.getNickname(),
                            chatMessage.getMessage());
                    messagingTemplate.convertAndSend(destination, chatMessagePubDto);

                    //그 다음 정답 채점 로직 구현
                    int round = gameRoom.getRound() - 1;
                    String submitedAnswer = chatMessage.getMessage().replaceAll(" ", "")
                            .toLowerCase();
                    for (String answer : gameRoom.getMultiModeProblems().get(round)
                            .getAnswerList()) {
                        //정답 맞은 경우
                        answer = answer.replaceAll(" ", "").toLowerCase();
                        if (submitedAnswer.equals(answer.toLowerCase())) {

                            gameRoom.setPlayType(PlayType.AFTERANSWER);

                            String title = gameRoom.getMultiModeProblems().get(round).getTitle();
                            String singer = gameRoom.getMultiModeProblems().get(round).getSinger();

                            // 정답자 닉네임, 정답 제목, 가수, skipVote 0 pub
                            BeforeAnswerCorrectDto beforeAnswerCorrectDto = BeforeAnswerCorrectDto.create(
                                    MessageDtoType.BEFOREANSWERCORRECT, chatMessage.getNickname(),
                                    title, singer, 0);
                            messagingTemplate.convertAndSend(destination, beforeAnswerCorrectDto);

                            //스킵 투표 초기화
                            gameRoom.setSkipVote(0);
                            //gameRoom의 UserInfoItems의 isSkiped 모두 false로 업데이트
                            for (UUID userUuid : gameRoom.getUserInfoItems().keySet()) {
                                UserInfoItem userInfoItem = gameRoom.getUserInfoItems()
                                        .get(userUuid);
                                userInfoItem.setSkipped(false);
                            }
                            return;
                        }
                    }
                }
            }

            if (playType == PlayType.AFTERANSWER) {
                if (chatMessage.getMessage().equals(".")) {
                    // 이미 스킵 했으면 그냥 return
                    if (gameRoom.getUserInfoItems().get(uuid).getIsSkipped()) {
                        return;
                    }
                    afterAnswerService.skip(gameRoom, uuid, destination);
                    return;
                } else {
                    //일반 채팅
                    ChatMessagePubDto chatMessagePubDto = ChatMessagePubDto.create(
                            MessageDtoType.CHAT, chatMessage.getNickname(),
                            chatMessage.getMessage());
                    messagingTemplate.convertAndSend(destination, chatMessagePubDto);
                }
            }
        }

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
                        beforeAnswerService.doBeforeAnswer(roomNum, room);
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
                            .map(item -> GameResultItem.builder().nickname(item.getNickname())
                                    .score(item.getScore()).build()).collect(Collectors.toList()));

                    // 점수 리스트를 담아 전송
                    GameResultDto dto = GameResultDto.builder().userResults(gameResults).build();

                    messagingTemplate.convertAndSend("/topic/" + roomNum, dto);
                }

                // 시간 초 카운트
                if (room.getTime() > 0) {

                    // 타임을 객체에 담아서
                    TimeDto dto = TimeDto.builder().time(room.getTime()).build();
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
                                memberInfo.getNickname(), memberInfo.getExp());

						memberInfos.add(
							GameRoomMemberInfo.builder()
								.nickName(memberInfo.getNickname())
								.build());
					}

                    // 다음 판을 위한 세팅
                    room.initializeRoom();

                    // 클라이언트에게 대기방 관련 정보 전달 해줘야 함
                    GameRoomPubDto dto = GameRoomPubDto.builder()
                            .memberInfos(memberInfos)
                            .roomNo(room.getRoomNo())
                            .roomName(room.getRoomName())
                            .password(room.getPassword())
                            .isPrivate(room.isPrivate())
                            .numberOfProblems(room.getNumberOfProblems())
                            .year(room.getYear())
                            .roomManagerNickname(room.getRoomManagerNickname())
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
            MemberInfo memberInfo = memberInfoRepository.findById(uuid).orElseThrow(
                    () -> new MemberInfoException(MemberInfoExceptionInfo.NOT_FOUND_MEMBER_INFO));

            items.add(ChannelUserResponseItem.builder().nickname(memberInfo.getNickname())
                    .userLevel((int) (memberInfo.getExp() / 50) + 1).build());
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
            logger.info("subscribeNo = {}", subscribeNo);
            if ((subscribeNo / 1000) == channelNo) {
                GameRoom gameRoom = gameRooms.get(subscribeNo);
                MemberInfo roomManager = memberInfoRepository.findById(
                        gameRoom.getRoomManagerUUID()).orElseThrow(() -> new MemberInfoException(
                        MemberInfoExceptionInfo.NOT_FOUND_MEMBER_INFO));
                List<String> years = Arrays.stream(gameRoom.getYear().split(" ")).toList();
                gameRoomListResponseItems.add(
                        GameRoomListResponseItem.builder()
                                .gameRoomNo(subscribeNo)
                                .roomTitle(gameRoom.getRoomName())
                                .roomManager(roomManager.getNickname())
                                .currentMembers(gameRoom.getTotalUsers())
                                .quizAmount(gameRoom.getNumberOfProblems())
                                .isPrivate(!gameRoom.getPassword().equals(""))
                                .isPlay(gameRoom.getGameRoomType().equals(GameRoomType.GAME))
                                .years(years)
                                .build());
            }
        }

        return GameRoomListResponseDto.builder().rooms(gameRoomListResponseItems).build();
    }

    public CreateGameRoomResponseDto makeGameRoom(String accessToken,
            CreateGameRoomRequestDto createGameRoomRequestDto) {
        UUID uuid = jwtValidator.getData(accessToken);
        MemberInfo memberInfo = memberInfoRepository.findById(uuid).orElseThrow(
                () -> new MemberInfoException(MemberInfoExceptionInfo.NOT_FOUND_MEMBER_INFO));

        Channel channel = GameValue.getChannel(createGameRoomRequestDto.getChannelNo());
        int curRoomIndex = channel.getMinimumEmptyRoomNo();
        int roomNumber = createGameRoomRequestDto.getChannelNo() * 1000 + curRoomIndex;

        Map<UUID, UserInfoItem> userInfoItems = new HashMap<>();
        userInfoItems.put(uuid,
                UserInfoItem.builder().nickname(memberInfo.getNickname()).score(0.0)
                        .isSkipped(false).build());
        GameRoom gameRoom = GameRoom.builder().roomNo(roomNumber)
                .roomName(createGameRoomRequestDto.getRoomName())
                .password(createGameRoomRequestDto.getPassword()).roomManagerUUID(uuid)
                .numberOfProblems(createGameRoomRequestDto.getQuizAmount())
                .year(createGameRoomRequestDto.getMusicYear()).totalUsers(1)
                .gameRoomType(GameRoomType.WAITING)
                .userInfoItems(userInfoItems).build();

        channel.removeUser(uuid);
        channel.addUser(uuid, roomNumber);
        GameValue.addGameChannel(roomNumber,
                gameRoom);
        logger.info("Create GameRoom Successful");
        channel.updateIsUsed(curRoomIndex);

		GameRoomMemberInfo gameRoomMemberInfo = GameRoomMemberInfo.builder()
			.nickName(memberInfo.getNickname())
			.build();
		List<GameRoomMemberInfo> gameRoomMemberInfos = new ArrayList<>();
		gameRoomMemberInfos.add(gameRoomMemberInfo);

        // 메세지 펍 해주기
        //일반 채팅

        String destination =
                "/topic/" + roomNumber;

        GameRoomPubDto gameRoomPubDto = GameRoomPubDto.builder()
			.messageDtoType(MessageDtoType.GOWAITING)
			.memberInfos(gameRoomMemberInfos)
			.roomNo(roomNumber)
			.roomName(createGameRoomRequestDto.getRoomName())
			.password(createGameRoomRequestDto.getPassword())
			.isPrivate(!gameRoom.getPassword().equals(""))
			.numberOfProblems(createGameRoomRequestDto.getQuizAmount())
			.year(createGameRoomRequestDto.getMusicYear())
			.roomManagerNickname(memberInfo.getNickname())
			.build();

        messagingTemplate.convertAndSend(destination, gameRoomPubDto);

        return CreateGameRoomResponseDto.builder()
                .gameRoomNo(roomNumber)
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

        return ExitGameRoomResponse.builder().destinationNo(lobbyNo).build();
    }

    public void enterGameRoom(String accessToken, int channelNo, String password) {
        UUID uuid = jwtValidator.getData(accessToken);
        String nickname = memberInfoRepository.findNicknameById(uuid)
                .orElseThrow(() -> new MemberInfoException(
                        MemberInfoExceptionInfo.NOT_FOUND_MEMBER_INFO));

        String destination = getDestination(channelNo);
        GameRoom gameRoom = GameValue.getGameRooms().get(channelNo);

		EnterGameRoomDto enterGameRoomDto = commonService.enterGameRoom(uuid, nickname, gameRoom, channelNo, password);

		messagingTemplate.convertAndSend(destination, enterGameRoomDto);
	}

    public void exitGameRoom(String accessToken, int channelNo) {
        UUID uuid = jwtValidator.getData(accessToken);
        String nickname = memberInfoRepository.findNicknameById(uuid)
                .orElseThrow(() -> new MemberInfoException(
                        MemberInfoExceptionInfo.NOT_FOUND_MEMBER_INFO));

        String destination = getDestination(channelNo);
        GameRoom gameRoom = GameValue.getGameRooms().get(channelNo);

		ExitGameRoomDto exitGameRoomDto = commonService.exitGameRoom(uuid, gameRoom, channelNo);

		messagingTemplate.convertAndSend(destination, exitGameRoomDto);
	}

}
