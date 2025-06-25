package com.chatpoc.dto;

public class ChatDto {
    private String text;
    private String author;
    private String role;
    private String roomId;

    public ChatDto() {}

    public ChatDto(String text, String author, String role, String roomId) {
        this.text = text;
        this.author = author;
        this.role = role;
        this.roomId = roomId;
    }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getRoomId() { return roomId; }
    public void setRoomId(String roomId) { this.roomId = roomId; }
}
