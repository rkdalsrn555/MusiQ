package com.a608.musiq.domain.websocket.controller;

import com.a608.musiq.domain.websocket.dto.requestDto.CheckPasswordRequestDto;
import com.a608.musiq.domain.websocket.dto.responseDto.DisconnectSocketResponseDto;
import com.a608.musiq.domain.websocket.dto.requestDto.EnterGameRoomRequestDto;
import com.a608.musiq.domain.websocket.dto.responseDto.ExitGameRoomResponse;
import com.a608.musiq.domain.websocket.dto.responseDto.EnterGameRoomResponseDto;
import com.a608.musiq.domain.websocket.dto.responseDto.AllChannelSizeResponseDto;
import com.a608.musiq.domain.websocket.dto.responseDto.ChannelUserResponseDto;
import com.a608.musiq.domain.websocket.domain.ChatMessage;
import com.a608.musiq.domain.websocket.dto.requestDto.CreateGameRoomRequestDto;
import com.a608.musiq.domain.websocket.dto.responseDto.CreateGameRoomResponseDto;
import com.a608.musiq.domain.websocket.dto.responseDto.GameRoomListResponseDto;
import com.a608.musiq.domain.websocket.dto.responseDto.CheckPasswordResponseDto;
import com.a608.musiq.domain.websocket.service.GameService;
import com.a608.musiq.global.common.response.BaseResponse;

import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
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
		@RequestHeader("accessToken") String accessToken, @PathVariable int channelNo) {
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
	public ResponseEntity<BaseResponse<DisconnectSocketResponseDto>> disconnectSocket(
		@RequestHeader("accessToken") String accessToken, @PathVariable int channelNo) {
		return ResponseEntity.status(HttpStatus.OK)
			.body(BaseResponse.<DisconnectSocketResponseDto>builder()
				.data(gameService.disconnectUser(accessToken, channelNo))
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
	public ResponseEntity<BaseResponse<GameRoomListResponseDto>> getGameRoomList(
		@RequestHeader("accessToken") String accessToken, @PathVariable int channelNo) {

		return ResponseEntity.status(HttpStatus.OK)
			.body(BaseResponse.<GameRoomListResponseDto>builder()
				.data(gameService.getGameRoomList(accessToken, channelNo))
				.build());
	}

	/**
	 * @param accessToken
	 * @param createGameRoomRequestDto
	 * @see CreateGameRoomResponseDto
	 * @return
	 */
	@PostMapping("/main/create")
	@ResponseBody
	public ResponseEntity<BaseResponse<CreateGameRoomResponseDto>> createGameRoom(
		@RequestHeader("accessToken") String accessToken,
		@RequestBody CreateGameRoomRequestDto createGameRoomRequestDto) {

		return ResponseEntity.status(HttpStatus.OK)
			.body(BaseResponse.<CreateGameRoomResponseDto>builder()
				.data(gameService.makeGameRoom(accessToken, createGameRoomRequestDto))
				.build());
	}

	/**
	 * 비밀번호 체크
	 *
	 * @param checkPasswordRequestDto
	 * @return
	 */
	@PostMapping("/main/password")
	public ResponseEntity<BaseResponse<CheckPasswordResponseDto>> passwordCheck(
		@RequestBody CheckPasswordRequestDto checkPasswordRequestDto
	) {
		return ResponseEntity.status(HttpStatus.OK)
			.body(BaseResponse.<CheckPasswordResponseDto>builder()
				.code(HttpStatus.OK.value())
				.data(gameService.checkPassword(checkPasswordRequestDto))
				.build());
	}

	/**
	 * 게임방 입장
	 *
	 * @param accessToken
	 * @param enterGameRoomRequestDto
	 * @return
	 */
	@PostMapping("/main/enter/{channelNo}")
	@ResponseBody
	public ResponseEntity<BaseResponse<EnterGameRoomResponseDto>> enterGameRoom(
		@RequestHeader("accessToken") String accessToken,
		@RequestBody EnterGameRoomRequestDto enterGameRoomRequestDto) {

		return ResponseEntity.status(HttpStatus.OK)
			.body(BaseResponse.<EnterGameRoomResponseDto>builder()
				.data(gameService.enterGameRoom(accessToken, enterGameRoomRequestDto))
				.build());
	}

	/**
	 * 게임방 퇴장
	 *
	 * @param accessToken
	 * @param channelNo
	 * @see ExitGameRoomResponse
	 * @return
	 */
	@PatchMapping("/main/lobby/{channelNo}")
	@ResponseBody
	public ResponseEntity<BaseResponse<ExitGameRoomResponse>> exitGameRoom(
		@RequestHeader("accessToken") String accessToken, @PathVariable int channelNo) {

		return ResponseEntity.status(HttpStatus.OK)
			.body(BaseResponse.<ExitGameRoomResponse>builder()
				.data(gameService.moveLobby(accessToken, channelNo))
				.build());
	}

	@MessageMapping("/chat-message/{channelNo}")
	public void sendChatMessage(@DestinationVariable("channelNo") String channelNo, @Payload ChatMessage chatMessage,
		@Header("accessToken") String accessToken) {
		logger.info("Request Chat Message. channelNo : {}, chatMessage : {}", channelNo, chatMessage);

		if (chatMessage == null) {
			throw new IllegalArgumentException();
		}

        gameService.sendMessage(Integer.parseInt(channelNo), chatMessage, accessToken);
    }


}
