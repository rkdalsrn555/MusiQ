package com.a608.musiq.domain.member.service;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.a608.musiq.domain.member.domain.MemberInfo;
import com.a608.musiq.domain.member.domain.Visitor;
import com.a608.musiq.domain.member.dto.requestDto.LoginRequestDto;
import com.a608.musiq.domain.member.dto.responseDto.LoginResponseDto;
import com.a608.musiq.domain.member.dto.responseDto.ValidateDuplicatedLoginIdResponseDto;
import com.a608.musiq.domain.member.dto.responseDto.ValidateDuplicatedNicknameResponseDto;
import com.a608.musiq.domain.member.dto.responseDto.VisitResponseDto;
import com.a608.musiq.domain.member.domain.LoginType;
import com.a608.musiq.domain.member.domain.Member;
import com.a608.musiq.domain.member.dto.requestDto.JoinRequestDto;
import com.a608.musiq.domain.member.dto.responseDto.JoinResponseDto;
import com.a608.musiq.domain.member.repository.MemberInfoRepository;
import com.a608.musiq.domain.member.repository.MemberRepository;
import com.a608.musiq.domain.member.repository.VisitorRepository;
import com.a608.musiq.global.config.JwtProvider;
import com.a608.musiq.global.exception.exception.MemberException;
import com.a608.musiq.global.exception.info.MemberExceptionInfo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
	private static final int EXP_INITIAL_NUMBER = 0;

	private final MemberRepository memberRepository;
	private final MemberInfoRepository memberInfoRepository;
	private final VisitorRepository visitorRepository;
	private final JwtProvider jwtProvider;

	/**
	 * 회원가입
	 *
	 * @param joinRequestDto
	 * @see JoinResponseDto
	 * @return JoinResponseDto
	 *
	 */
	@Override
	@Transactional
	public JoinResponseDto signUp(JoinRequestDto joinRequestDto) {

		if (!validateDuplicatedLoginId(joinRequestDto.getLoginId()).isValid()) {
			throw new MemberException(MemberExceptionInfo.DUPLICATED_LONGIN_ID);
		}

		UUID memberUUID = UUID.randomUUID();
		memberRepository.save(Member.builder()
			.id(memberUUID)
			.loginId(joinRequestDto.getLoginId())
			.password(joinRequestDto.getPassword())
			.loginType(LoginType.SIMPLE)
			.build());

		if (!validateDuplicatedNickname(joinRequestDto.getNickname()).isValid()) {
			throw new MemberException(MemberExceptionInfo.DUPLICATED_NICKNAME);
		}

		MemberInfo memberInfo = memberInfoRepository.save(MemberInfo.builder()
			.id(memberUUID)
			.nickname(joinRequestDto.getNickname())
			.exp(EXP_INITIAL_NUMBER)
			.build());

		return JoinResponseDto.of(memberInfo.getNickname());
	}

	@Override
	public LoginResponseDto login(LoginRequestDto loginRequestDto) {
		Member member = memberRepository.findByLoginIdAndPassword(loginRequestDto.getLoginId(),
				loginRequestDto.getPassword())
			.orElseThrow(() -> new MemberException(MemberExceptionInfo.LOGIN_FAILED));

		// 토큰 발급
		String accessToken = jwtProvider.createAccessToken(member.getId());
		String refreshToken = jwtProvider.createRefreshToken(member.getId());
		// 토큰 리턴
		return null;
	}

	/**
	 * 방문자 체크
	 *
	 * @param userIp
	 * @see VisitResponseDto
	 * @return VisitResponseDto
	 */
	@Override
	@Transactional
	public VisitResponseDto visit(String userIp) {
		visitorRepository.save(Visitor.of(userIp));

		return VisitResponseDto.of(userIp);
	}

	/**
	 * 로그인 아이디 중복 검사
	 *
	 * @param loginId
	 * @see ValidateDuplicatedLoginIdResponseDto
	 * @return ValidateDuplicatedLoginIdResponseDto
	 */
	@Override
	@Transactional(readOnly = true)
	public ValidateDuplicatedLoginIdResponseDto validateDuplicatedLoginId(String loginId) {
		return new ValidateDuplicatedLoginIdResponseDto(memberRepository.findByLoginIdNotExists(loginId));
	}

	/**
	 * 닉네임 중복 검사
	 *
	 * @param nickname
	 * @see ValidateDuplicatedNicknameResponseDto
	 * @return ValidateDuplicatedNicknameResponseDto
	 */
	@Override
	@Transactional(readOnly = true)
	public ValidateDuplicatedNicknameResponseDto validateDuplicatedNickname(String nickname) {
		return new ValidateDuplicatedNicknameResponseDto(memberInfoRepository.findByNicknameNotExists(nickname));
	}
}
