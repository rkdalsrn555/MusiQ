package com.a608.musiq.domain.music.service;

import com.a608.musiq.domain.music.dto.requestDto.AddIpInLogRequestDto;
import com.a608.musiq.domain.music.dto.responseDto.AddIpInLogResponseDto;
import com.a608.musiq.domain.music.dto.responseDto.CreateRoomResponseDto;
import com.a608.musiq.domain.music.dto.responseDto.GameOverResponseDto;
import com.a608.musiq.domain.music.dto.responseDto.ProblemForGuestResponseDto;

import com.a608.musiq.domain.music.dto.responseDto.GradeAnswerResponseDto;
import com.a608.musiq.domain.music.dto.responseDto.SkipRoundResponseDto;

public interface MusicService {
	CreateRoomResponseDto createRoom(String difficulty, String year);

	AddIpInLogResponseDto addIpInLog(AddIpInLogRequestDto addIpInLogRequestDto);

	ProblemForGuestResponseDto getProblemForGuest(int roomId, int round);

	GradeAnswerResponseDto gradeAnswer(Integer roomId, Integer round, String answer);

	SkipRoundResponseDto skipRound(int roomId, int round);

	GameOverResponseDto gameOver(int roomId, int round);
}
