package com.a608.musiq.domain.member.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.a608.musiq.domain.member.domain.Visitor;
import com.a608.musiq.domain.member.dto.VisitResponseDto;
import com.a608.musiq.domain.member.domain.LoginType;
import com.a608.musiq.domain.member.domain.Member;
import com.a608.musiq.domain.member.dto.JoinRequestDto;
import com.a608.musiq.domain.member.dto.JoinResponseDto;
import com.a608.musiq.domain.member.repository.MemberInfoRepository;
import com.a608.musiq.domain.member.repository.MemberRepository;
import com.a608.musiq.domain.member.repository.VisitorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

	private final MemberRepository memberRepository;
	private final MemberInfoRepository memberInfoRepository;
	private final VisitorRepository visitorRepository;

	@Override
	public JoinResponseDto simpleJoin(JoinRequestDto joinRequestDto) {
		Member member = memberRepository.save(Member.builder()
			.id(UUID.randomUUID())
			.loginId(joinRequestDto.getLoginId())
			.password(joinRequestDto.getPassword())
			.loginType(LoginType.SIMPLE)
			.build());

		return null;
	}
	@Override
	public VisitResponseDto visit(String userIp) {
		visitorRepository.save(Visitor.of(userIp));

		return VisitResponseDto.of(userIp);
	}
}
