package com.a608.musiq.domain.music.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.a608.musiq.domain.music.service.MusicService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("music")
@RequiredArgsConstructor
public class MusicController {

	private final MusicService musicService;
}
