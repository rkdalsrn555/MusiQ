package com.a608.musiq.domain.ranking.dto.view;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RankingEntry {
    private String nickname;
    private double exp;

    @Builder
    public RankingEntry(String nickname, double exp) {
        this.nickname = nickname;
        this.exp = exp;
    }
}
