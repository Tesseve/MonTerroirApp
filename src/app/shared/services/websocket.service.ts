import { Injectable } from '@angular/core';
import { AnonymousSubject, Subject } from 'rxjs/internal/Subject';
import { AuthService } from 'src/app/auth/auth.service';
import { Message } from 'src/app/models/Message';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private subject: AnonymousSubject<MessageEvent> | undefined;
  public newMessage$: Subject<Message>;

  constructor(private authService: AuthService) {
    this.newMessage$ = new Subject();
    const token = authService.getToken();
    const ws = new WebSocket(environment.websocketUrl, token);

    ws.onopen = () => {
      console.log('Successfully connected to the WebSocket at', ws.url);
      // When the connection is done, emit the WebSocket instance
    };

    ws.onmessage = (event) => {
      console.log('Received message from the WebSocket server', event.data);
      const data = JSON.parse(event.data);
      if (data.code == 'NEW_MESSAGE') {
        console.log('DATA', data);
        this.newMessage$.next(data.message.data);
      }
    };
  }
}
