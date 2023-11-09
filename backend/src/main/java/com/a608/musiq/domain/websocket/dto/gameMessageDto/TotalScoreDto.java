package com.a608.musiq.domain.websocket.dto.gameMessageDto;

import com.a608.musiq.domain.websocket.data.MessageDtoType;
import com.a608.musiq.domain.websocket.domain.UserInfoItem;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TotalScoreDto {
    MessageDtoType type;
    int time;
    List<GameResultItem> gameResult;

    @Builder
    public TotalScoreDto(MessageDtoType type, int time, List<GameResultItem> gameResult) {
        this.type = type;
        this.time = time;
        this.gameResult = gameResult;
    }
}
