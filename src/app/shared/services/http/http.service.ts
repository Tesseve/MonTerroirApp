import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  async getHeaders(): Promise<any> {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization:
        'Bearer ' + (await firstValueFrom(this.authService.getToken$())),
    };
  }

  url = (path: string) => {
    return environment.apiURL + path;
  };

  async get(path: string): Promise<any> {
    return await firstValueFrom(
      this.httpClient.get(this.url(path), {
        responseType: 'json',
        headers: await this.getHeaders(),
      })
    );
  }

  async post(path: string, body: any): Promise<any> {
    return await firstValueFrom(
      this.httpClient.post(this.url(path), body, {
        responseType: 'json',
        headers: await this.getHeaders(),
      })
    );
  }

  async put(path: string, body: any): Promise<any> {
    return await firstValueFrom(
      this.httpClient.put(this.url(path), body, {
        responseType: 'json',
        headers: await this.getHeaders(),
      })
    );
  }

  async delete(path: string): Promise<any> {
    return await firstValueFrom(
      this.httpClient.delete(this.url(path), {
        responseType: 'json',
        headers: await this.getHeaders(),
      })
    );
  }
}
