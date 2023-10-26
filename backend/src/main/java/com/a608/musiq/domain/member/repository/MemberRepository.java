package com.a608.musiq.domain.member.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.a608.musiq.domain.member.domain.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member , UUID> {
}