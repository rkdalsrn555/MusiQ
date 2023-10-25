package com.a608.musiq.domain.music.service;

import org.springframework.stereotype.Service;

import com.a608.musiq.domain.music.repository.MusicRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MusicServiceImpl {

	private final MusicRepository musicRepository;
}
