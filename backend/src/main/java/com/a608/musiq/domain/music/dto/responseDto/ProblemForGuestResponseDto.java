package com.a608.musiq.domain.music.dto.responseDto;

import com.a608.musiq.domain.music.data.Difficulty;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProblemForGuestResponseDto {
    private Difficulty difficulty;
    private Integer musicId;
    private String musicUrl;
    private int round;

    public static ProblemForGuestResponseDto create(Difficulty difficulty, Integer musicId, String musicUrl, int round){
        return new ProblemForGuestResponseDto(difficulty, musicId, musicUrl, round);
    }
}
