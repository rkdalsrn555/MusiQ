package com.a608.musiq.domain.websocket.service.subService;

import com.a608.musiq.domain.websocket.data.GameRoomType;
import com.a608.musiq.domain.websocket.data.MessageDtoType;
import com.a608.musiq.domain.websocket.data.PlayType;
import com.a608.musiq.domain.websocket.domain.GameRoom;
import com.a608.musiq.domain.websocket.domain.UserInfoItem;
import com.a608.musiq.domain.websocket.dto.gameMessageDto.AfterAnswerDto;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BeforeAnswerService {

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
