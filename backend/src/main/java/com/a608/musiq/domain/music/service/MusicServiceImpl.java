package com.a608.musiq.domain.music.service;



import com.a608.musiq.domain.music.repository.MusicRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MusicServiceImpl implements MusicService{

	private final MusicRepository musicRepository;
}
