import { Injectable } from '@angular/core';
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private stompClient: Client;
    private messageSubject = new BehaviorSubject<ChatMessage[]>([]);

    constructor() {
        const socketFactory = () => new SockJS('http://localhost:8080/chat-socket');
        this.stompClient = Stomp.over(socketFactory);
        this.stompClient.reconnectDelay = 5000;

        this.stompClient.onConnect = () => {
            this.stompClient.subscribe('/topic/room-support', (message: IMessage) => {
                const newMsg: ChatMessage = JSON.parse(message.body);
                const current = this.messageSubject.value;
                this.messageSubject.next([...current, newMsg]);
            });
        };

        this.stompClient.activate();
    }

    sendMessage(content: string, sender: string) {
        if (!this.stompClient.connected) return;

        const msg: ChatMessage = { text: content, author: sender };
        this.stompClient.publish({
            destination: '/app/chat/room-support',
            body: JSON.stringify(msg)
        });
    }

    getMessages(): Observable<ChatMessage[]> {
        return this.messageSubject.asObservable();
    }
}
