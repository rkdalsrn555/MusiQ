package com.a608.musiq.domain.music.service;

import com.a608.musiq.domain.music.dto.responseDto.ProblemForGuestResponseDto;

public interface MusicService {
    ProblemForGuestResponseDto getProblemForGuest(String difficulty, String year);

}
