package com.a608.musiq.domain.music.service;

import com.a608.musiq.domain.music.dto.responseDto.CreateRoomResponseDto;
import com.a608.musiq.domain.music.dto.responseDto.ProblemForGuestResponseDto;

import com.a608.musiq.domain.music.dto.responseDto.GradeAnswerResponseDto;

public interface MusicService {
	CreateRoomResponseDto createRoom(String difficulty, String year);
    // ProblemForGuestResponseDto getProblemForGuest(String difficulty, String year);
	GradeAnswerResponseDto gradeAnswer(Integer musicId, String answer);
}
