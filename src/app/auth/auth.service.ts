import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, from } from 'rxjs';
import { delayWhen, map } from 'rxjs/operators';

import { AuthResponse } from '../models/AuthResponse';
import { User } from '../models/User';
import { AuthRequest } from '../models/AuthRequest';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';

const API_URL = environment.apiURL;

/**
 * Authentication service for login/logout.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  #auth$: ReplaySubject<AuthResponse | undefined>;

  constructor(private http: HttpClient, private storage: Storage) {
    this.#auth$ = new ReplaySubject(1);
    this.storage.get('auth').then((auth) => {
      this.#auth$.next(auth);
    });
  }

  isAuthenticated$(): Observable<boolean> {
    return this.#auth$.pipe(
      map((auth) => {
        console.log(auth);
        return Boolean(auth);
      })
    );
  }

  getUser$(): Observable<User | undefined> {
    return this.#auth$.pipe(map((auth) => auth?.user));
  }

  getToken$(): Observable<string | undefined> {
    return this.#auth$.pipe(map((auth) => auth?.access_token));
  }

  logIn$(authRequest: AuthRequest): Observable<User> {
    const authUrl = `${API_URL}/auth/login`;
    console.log(authUrl);
    return this.http.post<AuthResponse>(authUrl, authRequest).pipe(
      delayWhen((auth) => {
        console.log(auth);
        return this.saveAuth$(auth);
      }),
      map((auth) => {
        console.log(auth);
        this.#auth$.next(auth);
        console.log(`User ${auth.user.username} logged in`);
        return auth.user;
      })
    );
  }

  logOut() {
    this.#auth$.next(undefined);
    this.storage.remove('auth');
    console.log('User logged out');
  }

  private saveAuth$(auth: AuthResponse): Observable<void> {
    return from(this.storage.set('auth', auth));
  }
}
