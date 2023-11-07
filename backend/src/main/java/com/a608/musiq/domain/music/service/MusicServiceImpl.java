package com.a608.musiq.domain.music.service;

import com.a608.musiq.domain.music.data.Difficulty;
import com.a608.musiq.domain.music.domain.GuestModeLog;
import com.a608.musiq.domain.music.domain.Music;
import com.a608.musiq.domain.music.domain.Room;
import com.a608.musiq.domain.music.domain.RoomManager;
import com.a608.musiq.domain.music.domain.Title;
import com.a608.musiq.domain.music.dto.requestDto.AddIpInLogRequestDto;
import com.a608.musiq.domain.music.dto.responseDto.*;
import com.a608.musiq.domain.music.repository.GuestModeLogRepository;
import com.a608.musiq.domain.music.repository.MusicRepository;
import com.a608.musiq.domain.music.repository.TitleRepository;
import com.a608.musiq.global.exception.exception.GuestModeLogException;
import com.a608.musiq.global.exception.exception.MusicException;
import com.a608.musiq.global.exception.info.GuestModeLogExceptionInfo;
import com.a608.musiq.global.exception.info.MusicExceptionInfo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.StringTokenizer;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MusicServiceImpl implements MusicService {
	private static final String SPACE = " ";
	private static final String EMPTY_STRING = "";
	private static final int EMPTY_LIST_SIZE = 0;
	private static final int LOOP_START_INDEX = 0;

	private final RoomManager roomManager = new RoomManager();

	private final MusicRepository musicRepository;
	private final TitleRepository titleRepository;
	private final GuestModeLogRepository guestModeLogRepository;

	/**
	 * 게스트 모드 방 생성
	 *
	 * @param difficulty
	 * @param year
	 * @return CreateRoomResponseDto
	 */
	@Override
	@Transactional
	public CreateRoomResponseDto createRoom(String difficulty, String year) {
		StringTokenizer stringTokenizer = new StringTokenizer(year, SPACE);
		Difficulty difficultyType = Difficulty.valueOf(difficulty.toUpperCase());

		int roomId = guestModeLogRepository.save(GuestModeLog.from(year, difficultyType)).getId();

		List<Music> musicList = insertMusic(stringTokenizer);
		Collections.shuffle(musicList);
		Room room = Room.from(musicList, difficultyType);
		roomManager.addRoom(roomId, room);

		return CreateRoomResponseDto.from(roomId, musicList.size());
	}

	/**
	 * 로그에 ip 추가
	 *
	 * @param addIpInLogRequestDto
	 * @see AddIpInLogResponseDto
	 * @return AddIpInLogResponseDto
	 */
	@Override
	@Transactional
	public AddIpInLogResponseDto addIpInLog(AddIpInLogRequestDto addIpInLogRequestDto) {
		GuestModeLog log = guestModeLogRepository.findById(addIpInLogRequestDto.getRoomId())
			.orElseThrow(() -> new GuestModeLogException(GuestModeLogExceptionInfo.NOT_FOUND_LOG));

		log.addIp(addIpInLogRequestDto.getUserIp());

		return AddIpInLogResponseDto.of(log.getIp());
	}

	/**
	 * 게스트 모드 문제 출제
	 *
	 * @param roomId
	 * @param round
	 * @see ProblemForGuestResponseDto
	 * @return ProblemForGuestResponseDto
	 */
	@Override
	public ProblemForGuestResponseDto getProblemForGuest(int roomId, int round) {
		Room room = roomManager.getRooms().get(roomId);

		Music music = room.getMusicList().get(round);

		return ProblemForGuestResponseDto.create(room.getDifficulty(), music.getId(),
			music.getUrl(), round);
	}

	/**
	 * 방에 노래 추가
	 *
	 * @param stringTokenizer
	 * @return List<Music>
	 */
	private List<Music> insertMusic(StringTokenizer stringTokenizer) {
		List<Music> musicList = new ArrayList<>();

		while (stringTokenizer.hasMoreTokens()) {
			List<Music> eachMusicListByYear = musicRepository.findAllByYear(stringTokenizer.nextToken());
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

			if (beforeTitleSetSize == afterTitleSetSize
				&& beforeSingerSetSize == afterSingerSetSize) {
				continue;
			}

			finalMusicList.add(nowMusic);
		}

		return finalMusicList;
	}

	/**
	 * 정답 채점
	 *
	 * @param roomId
	 * @param round
	 * @param answer
	 * @return GradeAnswerResponseDto
	 * @see GradeAnswerResponseDto
	 */
	@Override
	public GradeAnswerResponseDto gradeAnswer(Integer roomId, Integer round, String answer) {
		Room room = roomManager.getRooms().get(roomId);

		if (room.getRound() != round) {
			throw new MusicException(MusicExceptionInfo.INVALID_ROUND);
		}

		Music music = room.getMusicList().get(round);
		List<Title> titles = titleRepository.findAllByMusicId(music.getId());

		answer = answer.replaceAll(SPACE, EMPTY_STRING);

		GradeAnswerResponseDto gradeAnswerResponseDto = null;
		for (Title title : titles) {
			String musicTitle = title.getAnswer().toLowerCase().replace(SPACE, EMPTY_STRING);

			if (answer.equals(musicTitle)) {
				room.addRound(round);
				gradeAnswerResponseDto = GradeAnswerResponseDto.from(Boolean.TRUE, room.getRound(), music);
				break;
			}
		}

		if (gradeAnswerResponseDto == null) {
			gradeAnswerResponseDto = GradeAnswerResponseDto.from(Boolean.FALSE, room.getRound(),
				music);
		}

		return gradeAnswerResponseDto;
	}

	/**
	 * 라운드 스킵
	 *
	 * @param roomId
	 * @param round
	 * @see SkipRoundResponseDto
	 * @return SkipRoundResponseDto
	 */
	@Override
	public SkipRoundResponseDto skipRound(int roomId, int round) {
		Room room = roomManager.getRooms().get(roomId);
		String title = room.getMusicList().get(round).getTitle();
		String singer = room.getMusicList().get(round).getSinger();

		room.addRound(round);

		return SkipRoundResponseDto.from(room.getRound(), title, singer);
	}

	/**
	 * 게임 종료
	 *
	 * @param roomId
	 * @param round
	 * @see GameOverResponseDto
	 * @return GameOverResponseDto
	 */
	@Override
	public GameOverResponseDto gameOver(int roomId, int round) {
		GuestModeLog log = guestModeLogRepository.findById(roomId)
			.orElseThrow(() -> new GuestModeLogException(GuestModeLogExceptionInfo.NOT_FOUND_LOG));

		log.addEndedAt();

		return GameOverResponseDto.of(round);
	}

	/**
	 * 게임 포기
	 *
	 * @param roomId
	 * @param round
	 * @see GiveUpResponseDto
	 * @return GiveUpResponseDto
	 */
	@Override
	public GiveUpResponseDto giveUp(int roomId, int round) {
		Music music = roomManager.getRooms().get(roomId).getMusicList().get(round);
		String title = music.getTitle();
		String singer = music.getSinger();

		return GiveUpResponseDto.from(title, singer);
	}

}
