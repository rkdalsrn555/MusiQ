package com.a608.musiq.domain.member.domain;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.a608.musiq.domain.BaseTimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = "UPDATE frame SET deleted = true WHERE id = ?")
@Where(clause = "deleted = false")
public class Member extends BaseTimeEntity {

	@Id
	private UUID id;

	@Size(max = 30)
	@NotNull
	@Column
	private String loginId;

	@Size(max = 30)
	@NotNull
	@Column
	private String password;

	@NotNull
	@Column
	private LoginType loginType;

	@NotNull
	@Builder.Default
	@ColumnDefault("false")
	@Column
	public Boolean deleted= Boolean.FALSE;

}
