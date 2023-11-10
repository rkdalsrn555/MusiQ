package com.a608.musiq.domain.ranking.dto.view;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.redis.core.ZSetOperations.TypedTuple;

@Getter
@Setter
@NoArgsConstructor
public class FullRankItem {

    private Integer rankNum;
    private String nickName;
    private Integer level;

    public FullRankItem(TypedTuple<String> setElem) {
        this.nickName = setElem.getValue();
        this.level = (int)(setElem.getScore() / 50);
    }
}
