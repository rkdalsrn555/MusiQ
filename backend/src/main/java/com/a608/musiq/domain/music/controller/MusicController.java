package com.a608.musiq.domain.music.controller;

import com.a608.musiq.domain.music.dto.responseDto.CreateRoomResponseDto;
import com.a608.musiq.global.common.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
	@GetMapping("guest/room")
	private ResponseEntity<BaseResponse<CreateRoomResponseDto>> createRoom(
		@RequestParam("difficulty") String difficulty,
		@RequestParam("year") String year
	) {
		return ResponseEntity.status(HttpStatus.OK)
			.body(BaseResponse.<CreateRoomResponseDto>builder()
				.data(musicService.createRoom(difficulty, year))
				.build());
	}

	// /**
	//  * 게스트 모드 문제 출제
	//  * @param difficulty
	//  * @param year
	//  * @see ProblemForGuestResponseDto
	//  * @return ResponseEntity<BaseResponse<ProblemForGuestResponseDto>>
	//  */
	// @GetMapping("/guest/quiz")
	// private ResponseEntity<BaseResponse<ProblemForGuestResponseDto>> getProblemForGuest(
	// 	@RequestParam("difficulty") String difficulty,
	// 	@RequestParam("year") String year){
	//
	// 	return ResponseEntity.status(HttpStatus.OK)
	// 		.body(BaseResponse.<ProblemForGuestResponseDto>builder()
	// 			.data(musicService.getProblemForGuest(difficulty, year))
	// 			.build());
	// }

	/**
	 * 게스트 모드 정답 채점
	 *
	 * @param musicId
	 * @param answer
	 * @see GradeAnswerResponseDto
	 * @return ResponseEntity<BaseResponse<GradeAnswerResponseDto>>
	 */
	@GetMapping("/guest/result")
	private ResponseEntity<BaseResponse<GradeAnswerResponseDto>> gradeAnswer(
		@RequestParam("music-id") Integer musicId,
		@RequestParam("answer") String answer) {

		return ResponseEntity.status(HttpStatus.OK)
			.body(BaseResponse.<GradeAnswerResponseDto>builder()
				.code(HttpStatus.OK.value())
				.data(musicService.gradeAnswer(musicId, answer))
				.build());
	}
}
