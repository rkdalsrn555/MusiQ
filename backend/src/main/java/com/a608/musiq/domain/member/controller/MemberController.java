package com.a608.musiq.domain.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a608.musiq.domain.member.dto.VisitResponseDto;
import com.a608.musiq.domain.member.dto.JoinRequestDto;
import com.a608.musiq.domain.member.dto.JoinResponseDto;
import com.a608.musiq.domain.member.service.MemberService;
import com.a608.musiq.global.common.response.BaseResponse;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

	private final MemberService memberService;

	@GetMapping("/visit")
	private ResponseEntity<BaseResponse<VisitResponseDto>> visit(HttpServletRequest request) {

		return ResponseEntity.status(HttpStatus.OK)
			.body(BaseResponse.<VisitResponseDto>builder()
				.code(HttpStatus.OK.value())
				.data(memberService.visit(request.getRemoteAddr()))
				.build());
	}

	@PostMapping("/signup")
	private ResponseEntity<BaseResponse<JoinResponseDto>> signUp(@RequestBody JoinRequestDto joinRequestDto) {
		return ResponseEntity.status(HttpStatus.OK)
			.body(BaseResponse.<JoinResponseDto>builder()
				.code(HttpStatus.OK.value())
				.data(memberService.signUp(joinRequestDto))
				.build());
	}

	@PostMapping("/login")
	private ResponseEntity<BaseResponse<JoinResponseDto>> login(JoinRequestDto joinRequestDto) {
		return ResponseEntity.status(HttpStatus.OK)
			.body(BaseResponse.<JoinResponseDto>builder()
				.code(HttpStatus.OK.value())
				.data(memberService.signUp(joinRequestDto))
				.build());
	}
}
