package com.a608.musiq.domain.websocket.domain;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MultiModeProblem {

    //곡명
    private String title;
    //힌트
    private String hint;
    //가수
    private String singer;
    //링크
    private String url;
    //정답 List
    private List<String> answers;

    public static MultiModeProblem create(String title, String hint, String singer, String url,
        List<String> answers) {

        return new MultiModeProblem(title,hint,singer,url,answers);
    }


}
