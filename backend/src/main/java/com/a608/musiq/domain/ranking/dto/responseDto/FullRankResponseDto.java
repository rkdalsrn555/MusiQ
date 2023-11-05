package com.a608.musiq.domain.ranking.dto.responseDto;

import com.a608.musiq.domain.ranking.dto.view.FullRankItem;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FullRankResponseDto {
    private List<FullRankItem> rankList;

    @Builder
    public FullRankResponseDto(List<FullRankItem> rankList) {
        this.rankList = rankList;
    }
}
