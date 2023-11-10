package com.a608.musiq.domain.websocket.dto.gameMessageDto;

import com.a608.musiq.domain.websocket.data.MessageDtoType;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GameResultDto {

    private MessageDtoType type;
    private List<GameResultItem> userResults;

    @Builder
    public GameResultDto(List<GameResultItem> userResults) {

        this.type = MessageDtoType.GAMERESULT;
        this.userResults = userResults;
    }
}
