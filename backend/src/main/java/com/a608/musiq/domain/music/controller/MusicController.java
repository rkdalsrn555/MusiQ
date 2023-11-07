package com.a608.musiq.domain.music.controller;

import com.a608.musiq.domain.music.dto.requestDto.AddIpInLogRequestDto;
import com.a608.musiq.domain.music.dto.responseDto.AddIpInLogResponseDto;
import com.a608.musiq.domain.music.dto.responseDto.CreateRoomResponseDto;
import com.a608.musiq.domain.music.dto.responseDto.ProblemForGuestResponseDto;
import com.a608.musiq.domain.music.dto.responseDto.SkipRoundResponseDto;
import com.a608.musiq.global.common.response.BaseResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.a608.musiq.domain.music.dto.responseDto.GradeAnswerResponseDto;
import com.a608.musiq.domain.music.service.MusicService;

@RestController
@RequestMapping("/music")
@RequiredArgsConstructor
public class MusicController {

	private final MusicService musicService;

	/**
	 * 게스트 모드 방 생성
	 *
	 * @param difficulty
	 * @param year
	 * @return
	 */
	@PostMapping("/guest/room")
	private ResponseEntity<BaseResponse<CreateRoomResponseDto>> createRoom(
		@RequestParam("difficulty") String difficulty,
		@RequestParam("year") String year
	) {
		return ResponseEntity.status(HttpStatus.OK)
			.body(BaseResponse.<CreateRoomResponseDto>builder()
				.code(HttpStatus.OK.value())
				.data(musicService.createRoom(difficulty, year))
				.build());
	}

	/**
	 * 로그에 ip 추가
	 *
	 * @param addIpInLogRequestDto
	 * @see AddIpInLogResponseDto
	 * @return ResponseEntity<BaseResponse < AddIpInLogResponseDto>>
	 */
	@PatchMapping("/guest/log")
	private ResponseEntity<BaseResponse<AddIpInLogResponseDto>> addIpInLog(
		@RequestBody AddIpInLogRequestDto addIpInLogRequestDto
	) {
		return ResponseEntity.status(HttpStatus.OK)
			.body(BaseResponse.<AddIpInLogResponseDto>builder()
				.code(HttpStatus.OK.value())
				.data(musicService.addIpInLog(addIpInLogRequestDto))
				.build());
	}

	/**
	 * 게스트 모드 문제 출제
	 *
	 * @param roomId
	 * @param round
	 * @see ProblemForGuestResponseDto
	 * @return ResponseEntity<BaseResponse < ProblemForGuestResponseDto>>
	 */
	@GetMapping("/guest/quiz")
	private ResponseEntity<BaseResponse<ProblemForGuestResponseDto>> getProblemForGuest(
		@RequestParam("room-id") int roomId,
		@RequestParam("round") int round
	) {
		return ResponseEntity.status(HttpStatus.OK)
			.body(BaseResponse.<ProblemForGuestResponseDto>builder()
				.code(HttpStatus.OK.value())
				.data(musicService.getProblemForGuest(roomId, round))
				.build());
	}

	/**
	 * 게스트 모드 정답 채점
	 *
	 * @param roomId
	 * @param round
	 * @param answer
	 * @see GradeAnswerResponseDto
	 * @return ResponseEntity<BaseResponse < GradeAnswerResponseDto>>
	 */
	@GetMapping("/guest/result")
	private ResponseEntity<BaseResponse<GradeAnswerResponseDto>> gradeAnswer(
		@RequestParam("room-id") Integer roomId,
		@RequestParam("round") Integer round,
		@RequestParam("answer") String answer) {

		return ResponseEntity.status(HttpStatus.OK)
			.body(BaseResponse.<GradeAnswerResponseDto>builder()
				.code(HttpStatus.OK.value())
				.data(musicService.gradeAnswer(roomId, round, answer))
				.build());
	}

	/**
	 * 라운드 스킵
	 *
	 * @param roomId
	 * @param round
	 * @see SkipRoundResponseDto
	 * @return ResponseEntity<BaseResponse<SkipRoundResponseDto>>
	 */
	@PatchMapping("/guest/skip")
	private ResponseEntity<BaseResponse<SkipRoundResponseDto>> skipRound(
		@RequestParam("room-id") int roomId,
		@RequestParam("round") int round
	) {
		return ResponseEntity.status(HttpStatus.OK)
			.body(BaseResponse.<SkipRoundResponseDto>builder()
				.code(HttpStatus.OK.value())
				.data(musicService.skipRound(roomId, round))
				.build());
	}
}
