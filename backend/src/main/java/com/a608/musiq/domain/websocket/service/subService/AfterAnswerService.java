package com.a608.musiq.domain.websocket.service.subService;

import com.a608.musiq.domain.websocket.data.GameRoomType;
import com.a608.musiq.domain.websocket.data.MessageDtoType;
import com.a608.musiq.domain.websocket.data.PlayType;
import com.a608.musiq.domain.websocket.domain.GameRoom;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.AfterAnswerDto;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.SkipVoteDto;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
@RequiredArgsConstructor
@Service
public class AfterAnswerService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    private static final int MAKING_HALF_NUMBER = 2;
    private static final int MAKING_CEIL_NUMBER = 1;
    public void doAfterAnswer(Integer roomNum, GameRoom room) {

        // 카운트 다운 전송
        AfterAnswerDto dto = AfterAnswerDto.builder()
                .type(MessageDtoType.AFTERANSWER)
                .time(room.getTime())
                .build();
        messagingTemplate.convertAndSend("/topic/"+roomNum, dto);

        // 남은 시간이 1초 이상이라면 시간 다운
        if(room.getTime() > 0) {
            room.timeDown();
        }
        // 0초인 경우
        else {
            if(room.getRound() >= room.getNumberOfProblems()) {
                room.changeGameRoomType(GameRoomType.END);
                room.setTime(10);
            }
            else {
                room.changePlayType(PlayType.ROUNDSTART);
                room.roundUp();
                room.setTime(5);
            }
        }
    }

    public void skip(GameRoom gameRoom, UUID uuid, String destination){
        int skipVote = gameRoom.getSkipVote();
        //게임 룸 skipVote ++
        gameRoom.setSkipVote(++skipVote);
        //해당 유저 isSkipped = true
        gameRoom.getUserInfoItems().get(uuid).setSkipped(true);
        //과반수인 경우
        if (gameRoom.getSkipVote() >= (gameRoom.getTotalUsers() / MAKING_HALF_NUMBER
            + MAKING_CEIL_NUMBER)) {
            gameRoom.setTime(0);
        }
        else{
            //과반수가 아닌 경우
            SkipVoteDto skipVoteDto = SkipVoteDto.create(MessageDtoType.AFTERSKIP, false,
                gameRoom.getSkipVote());
            // skipVote++ 하고 pub
            messagingTemplate.convertAndSend(destination, skipVoteDto);
        }
    }
}
