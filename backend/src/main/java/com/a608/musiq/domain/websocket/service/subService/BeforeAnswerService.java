package com.a608.musiq.domain.websocket.service.subService;

import com.a608.musiq.domain.websocket.data.MessageDtoType;
import com.a608.musiq.domain.websocket.data.PlayType;
import com.a608.musiq.domain.websocket.domain.GameRoom;
import com.a608.musiq.domain.websocket.domain.MultiModeProblem;
import com.a608.musiq.domain.websocket.domain.UserInfoItem;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.BeforeAnswerCorrectDto;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.InitialHintDto;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.SingerHintDto;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.SkipVoteDto;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.TimeDto;
import java.util.Map;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
public class BeforeAnswerService {

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    private static final int MAKING_HALF_NUMBER = 2;
    private static final int MAKING_CEIL_NUMBER = 1;

    /**
     * beforeAnswer 일때 스킵 로직 구현
     *
     * @param gameRoom
     * @param uuid
     * @param destination
     */
    public void skip(GameRoom gameRoom, UUID uuid, String destination) {
        int skipVote = gameRoom.getSkipVote();
        //게임 룸 skipVote ++
        gameRoom.setSkipVote(++skipVote);
        //해당 유저 isSkipped = true
        gameRoom.getUserInfoItems().get(uuid).setSkipped(true);

        //과반수인 경우
        if (gameRoom.getSkipVote() >= (gameRoom.getTotalUsers() / MAKING_HALF_NUMBER
            + MAKING_CEIL_NUMBER)) {
            //정답 pub
            int round = gameRoom.getRound() - 1;
            String title = gameRoom.getMultiModeProblems().get(round).getTitle();
            String singer = gameRoom.getMultiModeProblems().get(round).getSinger();

            BeforeAnswerCorrectDto beforeAnswerCorrectDto = BeforeAnswerCorrectDto.create(
                MessageDtoType.BEFOREANSWERCORRECT,"", title, singer,0);
            messagingTemplate.convertAndSend(destination, beforeAnswerCorrectDto);

            //스킵 투표 pub
            gameRoom.setSkipVote(0);
            // 메시지 타입 SKIP, isSkipped true, skipVote = 0 으로 pub
            SkipVoteDto skipVoteDto = SkipVoteDto.create(MessageDtoType.BEFORESKIP, true,
                gameRoom.getSkipVote());
            messagingTemplate.convertAndSend(destination, skipVoteDto);

            //gameRoom의 playType를 AFTERANSWER 로 바꿔줌
            gameRoom.setPlayType(PlayType.AFTERANSWER);

            //gameRoom의 UserInfoItems의 isSkiped 모두 false로 업데이트
            for (UUID userUuid : gameRoom.getUserInfoItems().keySet()) {
                UserInfoItem userInfoItem = gameRoom.getUserInfoItems().get(userUuid);
                userInfoItem.setSkipped(false);
            }

        } else {
            //과반수가 아닌 경우
            SkipVoteDto skipVoteDto = SkipVoteDto.create(MessageDtoType.BEFORESKIP, false,
                gameRoom.getSkipVote());
            // skipVote++ 하고 pub
            messagingTemplate.convertAndSend(destination, skipVoteDto);
        }

    }


    public void doBeforeAnswer(Integer roomNum, GameRoom room) {

        // 현재 문제를 뽑아오기
        MultiModeProblem currentProblem = room.getMultiModeProblems().get(room.getRound() - 1);

        // 남은 시간이 30초라면 가수 힌트
        if (room.getTime() == 30) {
            SingerHintDto dto = SingerHintDto.builder().singerHint(currentProblem.getSinger())
                .build();
            messagingTemplate.convertAndSend("/topic/" + roomNum, dto);
        }
        // 20초 남았다면 초성 힌트
        else if (room.getTime() == 20) {
            InitialHintDto dto = InitialHintDto.builder().initialHint(currentProblem.getHint())
                .build();
            messagingTemplate.convertAndSend("/topic/" + roomNum, dto);
        }

        // 남은 시간이 1초 이상이라면 시간 전송 및 다운
        if (room.getTime() > 0) {

            // 카운트 다운 전송
            TimeDto timeDto = TimeDto.builder().time(room.getTime()).build();
            messagingTemplate.convertAndSend("/topic/" + roomNum, timeDto);

            // 시간 다운
            room.timeDown();
        }
        // 0초인 경우
        else {
            room.changePlayType(PlayType.AFTERANSWER);
            room.setTime(10);

            BeforeAnswerCorrectDto dto = BeforeAnswerCorrectDto.create(
                MessageDtoType.BEFOREANSWERCORRECT, "", currentProblem.getTitle(),
                currentProblem.getSinger(), 0);
            messagingTemplate.convertAndSend("/topic/" + roomNum, dto);

            // 참여 인원의 스킵 여부를 모두 false로 바꿈
            Map<UUID, UserInfoItem> userInfos = room.getUserInfoItems();
            for (UserInfoItem user : userInfos.values()) {
                user.setSkipped(false);
            }

            // 방의 전체 스킵 수도 0으로 설정
            room.setSkipVote(0);
        }
    }

}
