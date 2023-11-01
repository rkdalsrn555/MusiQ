package com.a608.musiq.domain.member.service;

import com.a608.musiq.domain.member.dto.VisitResponseDto;

public interface MemberService {
	VisitResponseDto visit(String userIp);
}
