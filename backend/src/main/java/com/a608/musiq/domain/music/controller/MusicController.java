package com.a608.musiq.domain.music.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a608.musiq.domain.music.service.MusicService;


@RestController
@RequestMapping("music")
@RequiredArgsConstructor
public class MusicController {

	private final MusicService musicService;
}
