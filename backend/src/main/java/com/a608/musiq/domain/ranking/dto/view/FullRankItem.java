package com.a608.musiq.domain.ranking.dto.view;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FullRankItem {

    private Integer rankNum;
    private String nickName;

    @Builder
    public FullRankItem(Integer rankNum, String nickName) {
        this.rankNum = rankNum;
        this.nickName = nickName;
    }
}
