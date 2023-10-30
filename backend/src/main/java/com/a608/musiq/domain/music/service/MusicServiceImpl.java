package com.a608.musiq.domain.music.service;

import com.a608.musiq.domain.music.data.Difficulty;
import com.a608.musiq.domain.music.domain.Music;
import com.a608.musiq.domain.music.domain.Room;
import com.a608.musiq.domain.music.domain.RoomManager;
import com.a608.musiq.domain.music.dto.responseDto.CreateRoomResponseDto;
import com.a608.musiq.domain.music.dto.responseDto.ProblemForGuestResponseDto;
import com.a608.musiq.domain.music.dto.responseDto.GradeAnswerResponseDto;
import com.a608.musiq.domain.music.repository.MusicRepository;
import com.a608.musiq.global.exception.exception.MusicException;
import com.a608.musiq.global.exception.info.MusicExceptionInfo;

import java.util.ArrayList;
import java.util.Collections;
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
	private static final int EMPTY_LIST_SIZE = 0;
	private static final int LOOP_START_INDEX = 0;

	private final RoomManager roomManager = new RoomManager();

	private final MusicRepository musicRepository;

	/**
	 * 게스트 모드 방 생성
	 *
	 * @param difficulty
	 * @param year
	 * @return CreateRoomResponseDto
	 */
	@Override
	public CreateRoomResponseDto createRoom(String difficulty, String year) {
		StringTokenizer st = new StringTokenizer(year, " ");
		Difficulty difficultyType = Difficulty.valueOf(difficulty.toUpperCase());

		List<Music> musicList = insertMusic(st);
		Collections.shuffle(musicList);
		Room room = Room.from(musicList, difficultyType);
		int roomId = roomManager.addRoom(room);

		return CreateRoomResponseDto.from(roomId, musicList.size());
	}

	/**
	 * 게스트 모드 문제 출제
	 *
	 * @param roomId
	 * @param streak
	 * @return
	 */
	@Override
	public ProblemForGuestResponseDto getProblemForGuest(int roomId, int streak) {
		Room room = roomManager.getRooms().get(roomId);

		Music music = room.getMusicList().get(streak);

		return ProblemForGuestResponseDto.create(room.getDifficulty(), music.getId(), music.getUrl());
	}

	/**
	 * 방에 노래 추가
	 *
	 * @param st
	 * @return List<Music>
	 */
	private List<Music> insertMusic(StringTokenizer st) {
		List<Music> musicList = new ArrayList<>();

		while (st.hasMoreTokens()) {
			List<Music> eachMusicListByYear = musicRepository.findAllByYear(st.nextToken());
			musicList.addAll(eachMusicListByYear);
		}
		int musicListSize = musicList.size();

		if (musicListSize == EMPTY_LIST_SIZE) {
			throw new MusicException(MusicExceptionInfo.INVALID_YEAR);
		}

		return deleteDuplicatedMusic(musicList);
	}

	/**
	 * 중복된 노래 제거
	 *
	 * @param musicList
	 * @return List<Music>
	 */
	private List<Music> deleteDuplicatedMusic(List<Music> musicList) {
		Set<String> titleSet = new HashSet<>();
		Set<String> singerSet = new HashSet<>();
		List<Music> finalMusicList = new ArrayList<>();

		for (int i = LOOP_START_INDEX; i < musicList.size(); i++) {
			Music nowMusic = musicList.get(i);

			int beforeTitleSetSize = titleSet.size();
			titleSet.add(nowMusic.getTitle());
			int afterTitleSetSize = titleSet.size();

			int beforeSingerSetSize = singerSet.size();
			singerSet.add(nowMusic.getSinger());
			int afterSingerSetSize = singerSet.size();

			if (beforeTitleSetSize == afterTitleSetSize && beforeSingerSetSize == afterSingerSetSize)
				continue;

			finalMusicList.add(nowMusic);
		}

		return finalMusicList;
	}

	/**
	 * 정답 채점
	 *
	 * @param roomId
	 * @param streak
	 * @param answer
	 * @see GradeAnswerResponseDto
	 * @return GradeAnswerResponseDto
	 */
	@Override
	public GradeAnswerResponseDto gradeAnswer(Integer roomId, Integer streak, String answer) {
		String title = roomManager.getRooms().get(roomId).getMusicList().get(streak).getTitle();

		GradeAnswerResponseDto gradeAnswerResponseDto;
		if (answer.equals(title)) {
			gradeAnswerResponseDto = GradeAnswerResponseDto.of(Boolean.TRUE);
		} else {
			gradeAnswerResponseDto = GradeAnswerResponseDto.of(Boolean.FALSE);
		}

		return gradeAnswerResponseDto;
	}
}
