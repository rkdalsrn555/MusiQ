package com.a608.musiq.domain.websocket.service.subService;

import com.a608.musiq.domain.websocket.data.PlayType;
import com.a608.musiq.domain.websocket.domain.GameRoom;
import com.a608.musiq.domain.websocket.domain.UserInfoItem;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BeforeAnswerService {


    public void finishBeforeAnswerWithNoSkipAndNoAnswer(GameRoom gameRoom){
        gameRoom.setTime(10);
        gameRoom.setPlayType(PlayType.AFTERANSWER);
        gameRoom.setSkipVote(0);
        //userInfoItem의 isSkipped 모두 false로 바꾸기
        makeAllIsSkippedOfUserInfoItemsFalse(gameRoom);

    }

    /**
     * userInfoItem의 isSkipped 모두 false로 바꾸기
     * @param gameRoom
     * */
    private void makeAllIsSkippedOfUserInfoItemsFalse(GameRoom gameRoom) {
        // 1. gameRoom에서 UserInfoItems 가져오기
        Map<UUID, UserInfoItem> userInfoItems = gameRoom.getUserInfoItems();
        // 2. Iterator를 사용하여 UserInfoItem의 isSkipped 속성을 변경
        for (UserInfoItem userInfoItem : userInfoItems.values()) {
            userInfoItem.setSkipped(false);
        }
        // 3. 변경된 userInfoItems를 gameRoom에 설정
        gameRoom.setUserInfoItems(userInfoItems);
    }

}
