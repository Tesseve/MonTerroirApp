import { inject, Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Conversation } from '../models/Conversation';

@Pipe({
  name: 'conversationName',
  standalone: true,
})
export class ConversationNamePipe implements PipeTransform {
  auth = inject(AuthService);

  transform(conversation: Conversation, ...args: unknown[]): string {
    const user = this.auth.getUser();
    const userID = user?._id;

    console.log(conversation);

    //get the other user
    const otherUser = conversation.users.find((user) => user._id !== userID);
    console.log({ otherUser });

    return otherUser?.username || 'Unknown';
  }
}
