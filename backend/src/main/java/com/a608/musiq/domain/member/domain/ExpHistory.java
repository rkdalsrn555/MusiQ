package com.a608.musiq.domain.member.domain;

import com.a608.musiq.domain.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Getter
@NoArgsConstructor
public class ExpHistory extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    @NotNull
    private UUID memberId;

    @Column
    @NotNull
    private Integer exp;

    @Builder
    public ExpHistory(@NotNull UUID memberId, @NotNull Integer exp, @NotNull LocalDateTime time) {
        this.memberId = memberId;
        this.exp = exp;
    }
}
