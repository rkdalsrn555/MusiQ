package com.a608.musiq.domain.websocket.service.subService;

import com.a608.musiq.domain.websocket.data.MessageDtoType;
import com.a608.musiq.domain.websocket.data.PlayType;
import com.a608.musiq.domain.websocket.domain.GameRoom;
import com.a608.musiq.domain.websocket.domain.UserInfoItem;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.AnswerAndSingerDto;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.SkipVoteDto;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class BeforeAnswerService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private static final int MAKING_HALF_NUMBER = 2;
    private static final int MAKING_CEIL_NUMBER = 1;

    /**
     * beforeAnswer 일때 스킵 로직 구현
     * @param gameRoom
     * @param uuid
     * @param destination
     * */
    public void skip(GameRoom gameRoom, UUID uuid, String destination) {
        int skipVote = gameRoom.getSkipVote();
        //게임 룸 skipVote ++
        gameRoom.setSkipVote(++skipVote);
        //해당 유저 isSkipped = true
        gameRoom.getUserInfoItems().get(uuid).setSkipped(true);

        //과반수인 경우
        if (gameRoom.getSkipVote() >= (gameRoom.getTotalUsers() / MAKING_HALF_NUMBER
            + MAKING_CEIL_NUMBER)) {

            //gameRoom의 playType를 AFTERANSWER 로 바꿔줌
            gameRoom.setPlayType(PlayType.AFTERANSWER);

            //gameRoom의 UserInfoItems의 isSkiped 모두 false로 업데이트
             for(UUID userUuid :gameRoom.getUserInfoItems().keySet()){
                UserInfoItem userInfoItem = gameRoom.getUserInfoItems().get(userUuid);
                userInfoItem.setSkipped(false);
             }

             gameRoom.setSkipVote(0);

            //정답 pub
            int round = gameRoom.getRound() - 1;
            String title = gameRoom.getMultiModeProblems().get(round).getTitle();
            String singer = gameRoom.getMultiModeProblems().get(round).getSinger();

            AnswerAndSingerDto answerAndSingerDto = AnswerAndSingerDto.create(title,
                singer);
            messagingTemplate.convertAndSend(destination, answerAndSingerDto);

            // 메시지 타입 SKIP, isSkipped true, skipVote = 0 으로 pub
            SkipVoteDto skipVoteDto = SkipVoteDto.create(MessageDtoType.BEFORESKIP, true, gameRoom.getSkipVote());
            messagingTemplate.convertAndSend(destination, skipVoteDto);


        } else {
            //과반수가 아닌 경우
            SkipVoteDto skipVoteDto = SkipVoteDto.create(MessageDtoType.BEFORESKIP, false,
                gameRoom.getSkipVote());
            // skipVote++ 하고 pub
            messagingTemplate.convertAndSend(destination, skipVoteDto);
        }

    }


    public void doBeforeAnswer(Integer roomNum, GameRoom room) {

//        // 카운트 다운 전송
//        BeforeAnswerDto dto = AfterAnswerDto.builder()
//                .type(MessageDtoType.AFTERANSWER)
//                .time(room.getTime())
//                .build();
//        messagingTemplate.convertAndSend("/topic/"+roomNum, dto);
//
//        // 남은 시간이 1초 이상이라면 시간 다운
//        if(room.getTime() > 0) {
//            room.timeDown();
//        }
//        // 0초인 경우
//        else {
//            if(room.getRound() >= room.getNumberOfProblems()) {
//                room.changeGameRoomType(GameRoomType.END);
//                room.setTime(10);
//            }
//            else {
//                room.changePlayType(PlayType.ROUNDSTART);
//                room.roundUp();
//                room.setTime(5);
//            }
//        }
    }

}
