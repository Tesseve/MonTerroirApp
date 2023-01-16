import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, from, Observable, ReplaySubject } from 'rxjs';
import { delayWhen, map } from 'rxjs/operators';

import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { AuthRegisterRequest } from '../models/AuthRegisterRequest';
import { AuthRequest } from '../models/AuthRequest';
import { AuthResponse } from '../models/AuthResponse';
import { User } from '../models/User';
import { ProductService } from '../shared/services/models/product/product.service';

const API_URL = environment.apiURL;

/**
 * Authentication service for login/logout.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  #auth$: ReplaySubject<AuthResponse | undefined>;

  #user: User | undefined;
  #token: string | undefined;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router
  ) {
    this.#auth$ = new ReplaySubject(1);
    this.storage.get('auth').then((auth) => {
      this.#auth$.next(auth);
    });

    this.#auth$.subscribe((auth) => {
      this.#user = auth?.user;
      this.#token = auth?.accessToken;
    });
  }

  isAuthenticated$(): Observable<boolean> {
    return this.#auth$.pipe(map((auth) => Boolean(auth)));
  }

  getUser(): User | undefined {
    return this.#user;
  }

  getToken$(): Observable<string | undefined> {
    return this.#auth$.pipe(map((auth) => auth?.accessToken));
  }

  getToken(): string | undefined {
    return this.#token;
  }

  logIn$(authRequest: AuthRequest): Observable<User> {
    const authUrl = `${API_URL}auth/login`;
    return this.http.post<AuthResponse>(authUrl, authRequest).pipe(
      delayWhen((auth) => {
        return this.saveAuth$(auth);
      }),
      map((auth) => {
        this.#auth$.next(auth);
        this.#user = auth.user;
        this.#token = auth.accessToken;
        return auth.user;
      })
    );
  }

  register$(authRegisterRequest: AuthRegisterRequest): Observable<User> {
    const authUrl = `${API_URL}auth/register`;
    return this.http.post<AuthResponse>(authUrl, authRegisterRequest).pipe(
      delayWhen((auth) => {
        return this.saveAuth$(auth);
      }),
      map((auth) => {
        console.log(auth);
        this.#auth$.next(auth);
        this.#user = auth.user;
        this.#token = auth.accessToken;
        return auth.user;
      })
    );
  }

  logout() {
    this.#auth$.next(undefined);
    this.storage.remove('auth');

    //navigate to login page and remove all pages from the stack wihtout animation
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  private saveAuth$(auth: AuthResponse): Observable<void> {
    return from(this.storage.set('auth', auth));
  }

  async reloadUser() {
    const authUrl = `${API_URL}auth/me`;
    return this.http.get<AuthResponse>(authUrl).pipe(
      delayWhen((auth) => {
        return this.saveAuth$(auth);
      }),
      map((auth) => {
        this.#auth$.next(auth);
        this.#user = auth.user;
        this.#token = auth.accessToken;
        return auth.user;
      })
    );
  }
}
