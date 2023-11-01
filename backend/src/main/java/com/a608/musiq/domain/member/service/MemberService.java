package com.a608.musiq.domain.member.service;

import com.a608.musiq.domain.member.dto.VisitResponseDto;

import com.a608.musiq.domain.member.dto.JoinRequestDto;
import com.a608.musiq.domain.member.dto.JoinResponseDto;

public interface MemberService {

	JoinResponseDto signUp(JoinRequestDto joinRequestDto);

	VisitResponseDto visit(String userIp);
}
