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
    private currentSubscription: any;

    constructor() {
        const socketFactory = () => new SockJS('http://localhost:8080/chat-socket');
        this.stompClient = Stomp.over(socketFactory);
        this.stompClient.reconnectDelay = 5000;
        this.stompClient.activate();
    }

    subscribeToRoom(roomId: string) {
        if (this.currentSubscription) {
            this.currentSubscription.unsubscribe();
        }
        this.messageSubject.next([]);
        this.currentSubscription = this.stompClient.subscribe(`/topic/${roomId}`, (message: IMessage) => {
            const newMsg: ChatMessage = JSON.parse(message.body);
            const current = this.messageSubject.value;
            this.messageSubject.next([...current, newMsg]);
        });
    }

    sendMessage(content: string, author: string, roomId: string) {
        if (!this.stompClient.connected) return;

        const msg: ChatMessage = { text: content, author: author, roomId: roomId };
        this.stompClient.publish({
            destination: `/app/chat/${roomId}`,
            body: JSON.stringify(msg)
        });
    }

    getMessages(): Observable<ChatMessage[]> {
        return this.messageSubject.asObservable();
    }
}
