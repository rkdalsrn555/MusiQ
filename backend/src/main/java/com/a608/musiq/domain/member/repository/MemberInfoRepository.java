package com.a608.musiq.domain.member.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.a608.musiq.domain.member.domain.MemberInfo;

@Repository
public interface MemberInfoRepository extends JpaRepository<MemberInfo, UUID> {

	@Query("select count(i.nickname) = 0 "
		+ "from MemberInfo i "
		+ "where i.nickname = :nickname ")
	boolean findByNicknameNotExists(@Param("nickname") String nickname);
}
