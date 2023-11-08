package com.a608.musiq.domain.websocket.service.subService;

import com.a608.musiq.domain.music.domain.Music;
import com.a608.musiq.domain.music.domain.Title;
import com.a608.musiq.domain.music.repository.MusicRepository;
import com.a608.musiq.domain.music.repository.TitleRepository;
import com.a608.musiq.domain.websocket.domain.MultiModeProblem;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.StringTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoundStartService {

    private final MusicRepository musicRepository;
    private final TitleRepository titleRepository;

    private static final String SPACE = " ";
    private static final int LOOP_START_INDEX = 0;

    public List<MultiModeProblem> makeMutiProblemList(int numberOfProblems, String year) {
        StringTokenizer st = new StringTokenizer(year, SPACE);

        List<Music> musicList = new ArrayList<>();

        //선택한 연도에 해당하는 모든 musicList 가져오기
        while (st.hasMoreTokens()) {
            List<Music> eachMusicListByYear = musicRepository.findAllByYear(st.nextToken());
            musicList.addAll(eachMusicListByYear);
        }
        //musicList 에서 중복 제거
        List<Music> finalMusicList = deleteDuplicatedMusic(musicList);

        //numberOfProblems 보다 finalMusicList.size() 가 더 작으면 에러
        if(finalMusicList.size() < numberOfProblems) throw new IllegalArgumentException();

        //finalMusicList 에서 필요한 값만 빼서 multiModeProblemList 만들기
        List<MultiModeProblem> multiModeProblemList = makeMultiModeProblemFromFinalMusicList(
            finalMusicList, numberOfProblems);


        return multiModeProblemList;
    }


    /**
     * finalMusicList 에서 필요한 값만 빼서 multiModeProblemList 만들기
     *
     * @param finalMusicList
     * @param numberOfProblems
     * @return List<Music>
     */
    private List<MultiModeProblem> makeMultiModeProblemFromFinalMusicList(
        List<Music> finalMusicList, int numberOfProblems) {
        List<MultiModeProblem> multiModeProblemList = new ArrayList<>();
        for (int i=LOOP_START_INDEX; i<numberOfProblems; i++) {
            Music music = finalMusicList.get(i);
            List<Title> titleList = titleRepository.findAllByMusicId(music.getId());
            List<String> answerList = new ArrayList<>();
            for (Title title : titleList) {
                answerList.add(title.getAnswer());
            }
            multiModeProblemList.add(
                MultiModeProblem.create(music.getTitle(), music.getHint(), music.getSinger(),
                    music.getUrl(), answerList)
            );
        }
        return multiModeProblemList;
    }

    /**
     * musicList에서 중복 제거
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
}
