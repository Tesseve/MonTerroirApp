import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export type Message = {
  message: string;
  sender: any;
  conversation: any;
  date: any;
  mine: boolean;
};
