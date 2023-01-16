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
    const otherUser = conversation.users.find(
      (user) => user._id !== this.auth.getUser()?._id
    );
    return otherUser?.username || 'Unknown';
  }
}
