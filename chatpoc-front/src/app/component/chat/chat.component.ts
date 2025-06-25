import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../models/chat-message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {
  roomId!: string;
  author!: string;
  role!: string;
  content: string = '';
  messageList: ChatMessage[] = [];

  constructor(private route: ActivatedRoute, private chatService: ChatService) {}

  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('roomId') || 'Room 1';
    this.author = this.route.snapshot.queryParamMap.get('author') || 'anonymous';
    this.role = this.route.snapshot.queryParamMap.get('role') || 'client';
    this.chatService.subscribeToRoom(this.roomId);
    this.chatService.getMessages().subscribe(messages => {
      this.messageList = messages;
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.content, this.author, this.roomId);
    this.content = '';
  }
}
