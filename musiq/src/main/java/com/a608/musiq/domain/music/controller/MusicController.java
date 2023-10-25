package com.a608.musiq.domain.music.controller;

import com.a608.musiq.domain.music.service.MusicService;


import org.springframework.web.bind.annotation.RequestMapping;



import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/music")
@RequiredArgsConstructor
public class MusicController {

	private final MusicService musicService;
}
