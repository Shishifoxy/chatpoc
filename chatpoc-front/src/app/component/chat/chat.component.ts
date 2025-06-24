import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../models/chat-message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messageInput: string = '';
  messageList: ChatMessage[] = [];
  sender: string = '';

  constructor(private chatService: ChatService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sender = this.route.snapshot.params['userId'] || 'client';

    this.chatService.getMessages().subscribe((messages) => {
      this.messageList = messages;
    });
  }

  sendMessage(): void {
    if (this.messageInput.trim()) {
      this.chatService.sendMessage(this.messageInput, this.sender);
      this.messageInput = '';
    }
  }

  isSender(msg: ChatMessage): boolean {
    return msg.author === this.sender;
  }

}
