package com.a608.musiq.domain.music.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProblemForGuestResponseDto {
    private Difficulty difficulty;
    private Integer musicId;
    private String musicUrl;

    public static ProblemForGuestResponseDto create(Difficulty difficulty, Integer musicId, String musicUrl){
        return new ProblemForGuestResponseDto(difficulty, musicId, musicUrl);
    }


    @Getter
    public enum Difficulty{

        EASY("EASY"),
        NORMAL("NORMAL"),
        HARD("HARD");

        private final String value;


        Difficulty(String value){
            this.value = value;
        }
    }

}
