package com.a608.musiq.domain.websocket.controller;

import com.a608.musiq.domain.websocket.dto.ChannelUserResponseDto;
import com.a608.musiq.domain.websocket.dto.ChannelUserResponseItem;
import com.a608.musiq.domain.websocket.service.GameService;
import com.a608.musiq.global.common.response.BaseResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/game")
public class GameController {

    private static final Logger logger = LoggerFactory.getLogger(GameController.class);

    private final GameService gameService;

    @GetMapping
    @ResponseBody
    public ResponseEntity<BaseResponse<ChannelUserResponseDto>> getChannelUsers(
            @RequestHeader("accessToken") String accessToken, @RequestParam int channelNo) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(BaseResponse.<ChannelUserResponseDto>builder()
                .data(gameService.getUserList(accessToken, channelNo))
                .build());
    }

}
