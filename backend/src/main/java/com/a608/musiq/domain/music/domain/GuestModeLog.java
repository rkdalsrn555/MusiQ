package com.a608.musiq.domain.music.domain;

import java.time.LocalDateTime;

import com.a608.musiq.domain.music.data.Difficulty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GuestModeLog {
	private static final int ROUND_INITIAL_NUMBER = 0;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@NotNull
	@Column
	private String year;

	@NotNull
	@Column
	private Difficulty difficulty;

	@Column
	private String ip;

	@NotNull
	@Column
	private int round;

	@NotNull
	@Column
	private LocalDateTime startedAt;

	@Column
	private LocalDateTime endedAt;

	@Column
	private int playTime;

	public static GuestModeLog from(String year, Difficulty difficulty) {
		return GuestModeLog.builder()
			.year(year)
			.difficulty(difficulty)
			.round(ROUND_INITIAL_NUMBER)
			.startedAt(LocalDateTime.now())
			.build();
	}

	public void addIp(String ip) {
		this.ip = ip;
	}

}
