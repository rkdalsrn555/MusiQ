package com.a608.musiq.domain.websocket.dto.gameMessageDto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GameResult {

    private List<GameResultItem> userResults;

    @Builder
    public GameResult(List<GameResultItem> userResults) {
        this.userResults = userResults;
    }
}
