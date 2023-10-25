package com.a608.musiq.domain.member.service;

import org.springframework.stereotype.Service;

import com.a608.musiq.domain.member.repository.MemberInfoRepository;
import com.a608.musiq.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

	private final MemberRepository memberRepository;
	private final MemberInfoRepository memberInfoRepository;

}
