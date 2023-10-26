package com.a608.musiq.domain.music.controller;

import com.a608.musiq.domain.music.dto.responseDto.ProblemForGuestResponseDto;
import com.a608.musiq.global.common.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.a608.musiq.domain.music.service.MusicService;


@RestController
@RequestMapping("/music")
@RequiredArgsConstructor
public class MusicController {

	private final MusicService musicService;

	//게스트 모드 문제출제
	@GetMapping("/guest/quiz")
	private ResponseEntity<BaseResponse<ProblemForGuestResponseDto>> getProblemForGuest(@RequestParam("difficulty") String difficulty, @RequestParam("year") String year){

		return ResponseEntity.status(HttpStatus.OK)
			.body(BaseResponse.<ProblemForGuestResponseDto>builder()
				.data(musicService.getProblemForGuest(difficulty, year))
				.build());
	}
}
