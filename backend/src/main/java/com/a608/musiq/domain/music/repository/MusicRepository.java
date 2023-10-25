package com.a608.musiq.domain.music.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.a608.musiq.domain.music.domain.Music;

@Repository
public interface MusicRepository extends JpaRepository<Music, Integer> {
}
