package com.a608.musiq.global.jwt;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.a608.musiq.global.exception.exception.MemberException;
import com.a608.musiq.global.exception.info.MemberExceptionInfo;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtValidator {

	@Value("${jwt.secret-key}")
	private String SECRET_KEY;

	public void validateToken(String jwtToken) {
		try {
			Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
			Claims claims = Jwts.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(jwtToken)
				.getBody();

			Date now = new Date();
			if (claims.getExpiration() != null && claims.getExpiration().before(now)) {
				throw new MemberException(MemberExceptionInfo.INVALID_TOKEN);
			}
		} catch (ExpiredJwtException e) {
			throw new MemberException(MemberExceptionInfo.INVALID_TOKEN);
		}
	}

	public String getData(String token) {
		Claims claims = Jwts.parserBuilder()
			.setSigningKey(SECRET_KEY.getBytes(StandardCharsets.UTF_8))
			.build()
			.parseClaimsJws(token)
			.getBody();

		String data = claims.get("data", String.class);

		return data;
	}
}
