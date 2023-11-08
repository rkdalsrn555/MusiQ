package com.a608.musiq.domain.websocket.controller;

import com.a608.musiq.domain.websocket.dto.AllChannelSizeResponseDto;
import com.a608.musiq.domain.websocket.dto.ChannelUserResponseDto;
import com.a608.musiq.domain.websocket.domain.ChatMessage;
import com.a608.musiq.domain.websocket.dto.GameRoomListResponseDto;
import com.a608.musiq.domain.websocket.service.GameService;
import com.a608.musiq.global.common.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

    /**
     * @param accessToken
     * @see AllChannelSizeResponseDto
     * @return
     */
    @GetMapping("/channel")
    @ResponseBody
    public ResponseEntity<BaseResponse<AllChannelSizeResponseDto>> getAllChannelSize(
            @RequestHeader("accessToken") String accessToken) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(BaseResponse.<AllChannelSizeResponseDto>builder()
                .data(gameService.getAllChannelSizeList(accessToken))
                .build());
    }

    /**
     * @param accessToken
     * @param channelNo
     * @see ChannelUserResponseDto
     * @return
     */
    @GetMapping("/{channelNo}")
    @ResponseBody
    public ResponseEntity<BaseResponse<ChannelUserResponseDto>> getChannelUsers(
            @RequestHeader("accessToken") String accessToken, @RequestParam int channelNo) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(BaseResponse.<ChannelUserResponseDto>builder()
                .data(gameService.getUserList(accessToken, channelNo))
                .build());
    }

    /**
     * @param accessToken
     * @param channelNo
     * @return
     */
    @PostMapping("/{channelNo}")
    @ResponseBody
    public ResponseEntity<BaseResponse<Integer>> disconnectSocket(
            @RequestHeader("accessToken") String accessToken, @RequestParam int channelNo) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(BaseResponse.<Integer>builder()
                .data(gameService.disConnectUser(accessToken, channelNo))
                .build());
    }

    /**
     * @param accessToken
     * @param channelNo
     * @see GameRoomListResponseDto
     * @return
     */
    @GetMapping("/main/{channelNo}")
    @ResponseBody
    public ResponseEntity<BaseResponse<GameRoomListResponseDto>> getGameRoomList(@RequestHeader("accessToken") String accessToken, @RequestParam int channelNo) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(BaseResponse.<GameRoomListResponseDto>builder()
                .data(gameService.getGameRoomList(accessToken, channelNo))
                .build());
    }

    @MessageMapping("/chat-message/{channelNo}")
    public void sendChatMessage(@DestinationVariable("channelNo") String channelNo, @Payload ChatMessage chatMessage) {
        logger.info("Request Chat Message. channelNo : {}, chatMessage : {}", channelNo, chatMessage);

        if(chatMessage == null) {
           throw new IllegalArgumentException();
        }

        gameService.sendMessage(Integer.parseInt(channelNo), chatMessage);
    }

}
