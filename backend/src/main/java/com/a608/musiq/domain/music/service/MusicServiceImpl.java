package com.a608.musiq.domain.music.service;



import com.a608.musiq.domain.music.domain.Music;
import com.a608.musiq.domain.music.dto.responseDto.ProblemForGuestResponseDto;
import com.a608.musiq.domain.music.repository.MusicRepository;

import com.a608.musiq.global.exception.exception.MusicException;
import com.a608.musiq.global.exception.info.MusicExceptionInfo;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Random;
import java.util.StringTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MusicServiceImpl implements MusicService{

	private final MusicRepository musicRepository;

	@Override
	public ProblemForGuestResponseDto getProblemForGuest(String difficulty, String year) {
		StringTokenizer st = new StringTokenizer(year," ");
		difficulty = difficulty.toUpperCase();

		List<Music> musicList = new ArrayList<>();

		while (st.hasMoreTokens()){
			List<Music> eachMusicListByYear=musicRepository.findAllByYear(st.nextToken());
			musicList.addAll(eachMusicListByYear);
		}
		int musicListSize = musicList.size();

		if(musicListSize == 0){
			throw new MusicException(MusicExceptionInfo.INVALID_YEAR);
		}

		Random random = new Random();

		int selectedMusicIndex = random.nextInt(musicListSize);

		Music selectedMusic = musicList.get(selectedMusicIndex);




		return ProblemForGuestResponseDto.create(
			ProblemForGuestResponseDto.Difficulty.valueOf(difficulty),
			selectedMusic.getId(),
			selectedMusic.getUrl()
		);


	}
}
