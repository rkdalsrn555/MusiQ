package com.a608.musiq.domain.music.service;

import com.a608.musiq.domain.music.dto.requestDto.AddIpInLogRequestDto;
import com.a608.musiq.domain.music.dto.responseDto.*;

public interface MusicService {
	CreateRoomResponseDto createRoom(String difficulty, String year);

	AddIpInLogResponseDto addIpInLog(AddIpInLogRequestDto addIpInLogRequestDto);

	ProblemForGuestResponseDto getProblemForGuest(int roomId, int round);

	GradeAnswerResponseDto gradeAnswer(Integer roomId, Integer round, String answer);

	SkipRoundResponseDto skipRound(int roomId, int round);

	GameOverResponseDto gameOver(int roomId, int round);

	GiveUpResponseDto giveUp(int roomId, int round);
}
