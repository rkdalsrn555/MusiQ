package com.a608.musiq.global.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Base64;
import java.util.Date;

@Log4j2
@Component
public class JwtProvider {

	@Value("${jwt.password}")
	private String secretKey;

	//==토큰 생성 메소드==//
	public String createToken(String subject) {
		Date now = new Date();
		Date expiration = new Date(now.getTime() + Duration.ofDays(1).toMillis()); // 만료기간 1일

		return Jwts.builder()
			.setHeaderParam(Header.TYPE, Header.JWT_TYPE) // (1)
			.setIssuer("test") // 토큰발급자(iss)
			.setIssuedAt(now) // 발급시간(iat)
			.setExpiration(expiration) // 만료시간(exp)
			.setSubject(subject) //  토큰 제목(subject)
			.signWith(SignatureAlgorithm.HS256, Base64.getEncoder().encodeToString(secretKey.getBytes())) // 알고리즘, 시크릿 키
			.compact();
	}

	//==Jwt 토큰의 유효성 체크 메소드==//
	public Claims parseJwtToken(String token) {
		token = BearerRemove(token); // Bearer 제거
		return Jwts.parser()
			.setSigningKey(Base64.getEncoder().encodeToString(secretKey.getBytes()))
			.parseClaimsJws(token)
			.getBody();
	}

	//==토큰 앞 부분('Bearer') 제거 메소드==//
	private String BearerRemove(String token) {
		return token.substring("Bearer ".length());
	}
}
