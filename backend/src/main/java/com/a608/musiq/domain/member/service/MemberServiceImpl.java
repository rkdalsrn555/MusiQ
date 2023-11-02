package com.a608.musiq.domain.member.service;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.a608.musiq.domain.member.domain.MemberInfo;
import com.a608.musiq.domain.member.domain.Visitor;
import com.a608.musiq.domain.member.dto.VisitResponseDto;
import com.a608.musiq.domain.member.domain.LoginType;
import com.a608.musiq.domain.member.domain.Member;
import com.a608.musiq.domain.member.dto.JoinRequestDto;
import com.a608.musiq.domain.member.dto.JoinResponseDto;
import com.a608.musiq.domain.member.repository.MemberInfoRepository;
import com.a608.musiq.domain.member.repository.MemberRepository;
import com.a608.musiq.domain.member.repository.VisitorRepository;
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

	@Override
	@Transactional
	public JoinResponseDto signUp(JoinRequestDto joinRequestDto) {

		validateDuplicatedLoginId(joinRequestDto.getLoginId());

		UUID memberUUID = UUID.randomUUID();
		memberRepository.save(Member.builder()
			.id(memberUUID)
			.loginId(joinRequestDto.getLoginId())
			.password(joinRequestDto.getPassword())
			.loginType(LoginType.SIMPLE)
			.build());

		validateDuplicatedNickname(joinRequestDto.getNickname());

		MemberInfo memberInfo = memberInfoRepository.save(MemberInfo.builder()
			.id(memberUUID)
			.nickname(joinRequestDto.getNickname())
			.exp(EXP_INITIAL_NUMBER)
			.build());

		return JoinResponseDto.of(memberInfo.getNickname());
	}

	@Override
	public VisitResponseDto visit(String userIp) {
		visitorRepository.save(Visitor.of(userIp));

		return VisitResponseDto.of(userIp);
	}

	private void validateDuplicatedLoginId(String loginId) {
		if (memberRepository.findByLoginIdExists(loginId)) {
			throw new MemberException(MemberExceptionInfo.DUPLICATED_LONGIN_ID);
		}
	}

	private void validateDuplicatedNickname(String nickname) {
		if (memberInfoRepository.findByNicknameExists(nickname)) {
			throw new MemberException(MemberExceptionInfo.DUPLICATED_NICKNAME);
		}
	}
}
