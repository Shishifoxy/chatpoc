package com.chatpoc.controller;

import com.chatpoc.dto.ChatDto;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat/{room}")
    @SendTo("/topic/{room}")
    public ChatDto handleMessage(@DestinationVariable String room, ChatDto message) {
        return new ChatDto(message.getText(), message.getAuthor());
    }
}
