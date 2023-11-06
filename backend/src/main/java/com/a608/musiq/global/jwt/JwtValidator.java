package com.a608.musiq.global.jwt;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.a608.musiq.global.Util;
import com.a608.musiq.global.exception.exception.MemberException;
import com.a608.musiq.global.exception.info.MemberExceptionInfo;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtValidator {

	private final Util util;

	@Value("${jwt.secret-key}")
	private String SECRET_KEY;

	public void validateToken(String token) {
		try {
			Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
			Claims claims = Jwts.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(token)
				.getBody();

			Date now = new Date();
			if (claims.getExpiration() != null && claims.getExpiration().before(now)) {
				throw new MemberException(MemberExceptionInfo.INVALID_TOKEN);
			}
		} catch (MalformedJwtException | ExpiredJwtException | SignatureException e) {

			throw new MemberException(MemberExceptionInfo.INVALID_TOKEN);
		}
	}

	public String validateRefreshToken(String refreshToken) {
		validateToken(refreshToken);

		String memberId = getData(refreshToken);

		String token = util.getRefreshToken(memberId);

		if (!refreshToken.equals(token)) {
			throw new MemberException(MemberExceptionInfo.INVALID_TOKEN);
		}

		return memberId;
	}

	private String getData(String token) {
		Claims claims = Jwts.parserBuilder()
			.setSigningKey(SECRET_KEY.getBytes(StandardCharsets.UTF_8))
			.build()
			.parseClaimsJws(token)
			.getBody();

		String data = claims.get("data", String.class);

		return data;
	}
}
