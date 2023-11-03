package com.a608.musiq.domain.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a608.musiq.domain.member.dto.VisitRequestDto;
import com.a608.musiq.domain.member.dto.VisitResponseDto;
import com.a608.musiq.domain.member.dto.requestDto.LoginRequestDto;
import com.a608.musiq.domain.member.dto.responseDto.LoginResponseDto;
import com.a608.musiq.domain.member.dto.responseDto.ValidateDuplicatedLoginIdResponseDto;
import com.a608.musiq.domain.member.dto.responseDto.ValidateDuplicatedNicknameResponseDto;
import com.a608.musiq.domain.member.dto.responseDto.VisitResponseDto;
import com.a608.musiq.domain.member.dto.requestDto.JoinRequestDto;
import com.a608.musiq.domain.member.dto.responseDto.JoinResponseDto;
import com.a608.musiq.domain.member.service.MemberService;
import com.a608.musiq.global.common.response.BaseResponse;

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

	/**
	 * 회원가입
	 *
	 * @param joinRequestDto
	 * @see JoinResponseDto
	 * @return ResponseEntity<BaseResponse<JoinResponseDto>>
	 */
	@PostMapping("/signup")
	private ResponseEntity<BaseResponse<JoinResponseDto>> signUp(@RequestBody JoinRequestDto joinRequestDto) {
		return ResponseEntity.status(HttpStatus.OK)
			.body(BaseResponse.<JoinResponseDto>builder()
				.code(HttpStatus.OK.value())
				.data(memberService.signUp(joinRequestDto))
				.build());
	}

	/**
	 * 로그인
	 *
	 * @param loginRequestDto
	 * @see LoginResponseDto
	 * @return ResponseEntity<BaseResponse<LoginResponseDto>>
	 */
	@PostMapping("/login")
	private ResponseEntity<BaseResponse<LoginResponseDto>> login(LoginRequestDto loginRequestDto) {
		return ResponseEntity.status(HttpStatus.OK)
			.body(BaseResponse.<LoginResponseDto>builder()
				.code(HttpStatus.OK.value())
				.data(memberService.login(loginRequestDto))
				.build());
	}

	/**
	 * 로그인 아이디 중복 검사
	 *
	 * @param loginId
	 * @see ValidateDuplicatedLoginIdResponseDto
	 * @return ResponseEntity<BaseResponse<ValidateDuplicatedLoginIdResponseDto>>
	 */
	@GetMapping("/validate-login-id/{login-id}")
	private ResponseEntity<BaseResponse<ValidateDuplicatedLoginIdResponseDto>> validateDuplicatedLoginId(
		@PathVariable("login-id") String loginId) {

		return ResponseEntity.status(HttpStatus.OK)
			.body(BaseResponse.<ValidateDuplicatedLoginIdResponseDto>builder()
				.code(HttpStatus.OK.value())
				.data(memberService.validateDuplicatedLoginId(loginId))
				.build());
	}

	/**
	 * 닉네임 중복 검사
	 *
	 * @param nickname
	 * @see ValidateDuplicatedNicknameResponseDto
	 * @return ResponseEntity<BaseResponse<ValidateDuplicatedNicknameResponseDto>>
	 */
	@GetMapping("/validate-nickname/{nickname}")
	private ResponseEntity<BaseResponse<ValidateDuplicatedNicknameResponseDto>> validateDuplicatedNickname(
		@PathVariable("nickname") String nickname) {

		return ResponseEntity.status(HttpStatus.OK)
			.body(BaseResponse.<ValidateDuplicatedNicknameResponseDto>builder()
				.code(HttpStatus.OK.value())
				.data(memberService.validateDuplicatedNickname(nickname))
				.build());
	}
}
