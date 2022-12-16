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
    return this.#auth$.pipe(map((auth) => Boolean(auth)));
  }

  getUser$(): Observable<User | undefined> {
    return this.#auth$.pipe(map((auth) => auth?.user));
  }

  getToken$(): Observable<string | undefined> {
    return this.#auth$.pipe(map((auth) => auth?.accessToken));
  }

  logIn$(authRequest: AuthRequest): Observable<User> {
    const authUrl = `${API_URL}auth/login`;
    return this.http.post<AuthResponse>(authUrl, authRequest).pipe(
      delayWhen((auth) => {
        return this.saveAuth$(auth);
      }),
      map((auth) => {
        this.#auth$.next(auth);
        return auth.user;
      })
    );
  }

  logOut() {
    this.#auth$.next(undefined);
    this.storage.remove('auth');
  }

  private saveAuth$(auth: AuthResponse): Observable<void> {
    return from(this.storage.set('auth', auth));
  }
}
