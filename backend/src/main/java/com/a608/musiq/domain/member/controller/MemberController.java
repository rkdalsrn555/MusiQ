package com.a608.musiq.domain.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a608.musiq.domain.member.dto.VisitRequestDto;
import com.a608.musiq.domain.member.dto.VisitResponseDto;
import com.a608.musiq.domain.member.service.MemberService;
import com.a608.musiq.global.common.response.BaseResponse;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

	private final MemberService memberService;

	@PostMapping("/visit")
	private ResponseEntity<BaseResponse<VisitResponseDto>> visit(@RequestBody VisitRequestDto visitRequestDto) {

		return ResponseEntity.status(HttpStatus.OK)
			.body(BaseResponse.<VisitResponseDto>builder()
				.code(HttpStatus.OK.value())
				.data(memberService.visit(visitRequestDto))
				.build());
	}

}
