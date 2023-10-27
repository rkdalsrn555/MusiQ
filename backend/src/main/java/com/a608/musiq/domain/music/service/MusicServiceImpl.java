package com.a608.musiq.domain.music.service;



import com.a608.musiq.domain.music.domain.Music;
import com.a608.musiq.domain.music.dto.responseDto.ProblemForGuestResponseDto;
import com.a608.musiq.domain.music.dto.responseDto.GradeAnswerResponseDto;
import com.a608.musiq.domain.music.repository.MusicRepository;
import com.a608.musiq.global.exception.exception.MusicException;
import com.a608.musiq.global.exception.info.MusicExceptionInfo;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.StringTokenizer;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MusicServiceImpl implements MusicService {

	private final MusicRepository musicRepository;

	/**
	 * 게스트 모드 문제 출제
	 *
	 * @param difficulty
	 * @param year
	 * @see ProblemForGuestResponseDto
	 * @return ProblemForGuestResponseDto
	 */
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
		Set<String> titleSet = new HashSet<>();
		Set<String> singerSet = new HashSet<>();
		List<Music> finalMusicList = new ArrayList<>();

		for (int i = 0; i <musicListSize ; i++) {
			Music nowMusic = musicList.get(i);

			int beforeTitleSetSize = titleSet.size();
			titleSet.add(nowMusic.getTitle());
			int afterTitleSetSize = titleSet.size();

			int beforeSingerSetSize = singerSet.size();
			singerSet.add(nowMusic.getSinger());
			int afterSingerSetSize = singerSet.size();


			//추가 x
			if(beforeTitleSetSize == afterTitleSetSize && beforeSingerSetSize == afterSingerSetSize) continue;

			finalMusicList.add(nowMusic);

		}

		int finalMusicListSize= finalMusicList.size();

		Random random = new Random();

		int selectedMusicIndex = random.nextInt(finalMusicListSize);

		Music selectedMusic = musicList.get(selectedMusicIndex);




		return ProblemForGuestResponseDto.create(
			ProblemForGuestResponseDto.Difficulty.valueOf(difficulty),
			selectedMusic.getId(),
			selectedMusic.getUrl()
		);


	}

	/**
	 * 정답 채점
	 *
	 * @param musicId
	 * @param answer
	 * @see GradeAnswerResponseDto
	 * @return GradeAnswerResponseDto
	 */
	@Override
	public GradeAnswerResponseDto gradeAnswer(Integer musicId, String answer) {
		String title = musicRepository.findTitleById(musicId)
			.orElseThrow(() -> new MusicException(MusicExceptionInfo.NOT_FOUND_MUSIC))
			.getTitle();

		GradeAnswerResponseDto gradeAnswerResponseDto;
		if (answer.equals(title)) {
			gradeAnswerResponseDto = GradeAnswerResponseDto.of(Boolean.TRUE);
		} else {
			gradeAnswerResponseDto = GradeAnswerResponseDto.of(Boolean.FALSE);
		}

		return gradeAnswerResponseDto;
	}
}
