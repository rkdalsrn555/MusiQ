package com.a608.musiq.domain.member.service;

import org.springframework.stereotype.Service;

import com.a608.musiq.domain.member.domain.Visitor;
import com.a608.musiq.domain.member.dto.VisitRequestDto;
import com.a608.musiq.domain.member.dto.VisitResponseDto;
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
	public VisitResponseDto visit(VisitRequestDto visitRequestDto) {
		visitorRepository.save(Visitor.of(visitRequestDto.getUserIp()));

		return VisitResponseDto.of(visitRequestDto.getUserIp());
	}
}
