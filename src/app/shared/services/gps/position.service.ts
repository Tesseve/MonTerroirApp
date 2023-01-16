import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  #position?: Position | null;

  constructor(private http: HttpClient) {
    this.getCurrentPosition();
  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.#position = coordinates;
    return coordinates;
  }

  watchPosition() {
    Geolocation.watchPosition({}, (position: Position | null, err: any) => {
      if (err) {
        console.error(err);
        return;
      }
      this.#position = position;
    });
  }

  get position() {
    return this.#position;
  }

  async getActualAddress() {
    if (!this.#position) {
      await this.getCurrentPosition();
    }
    if (!this.#position) {
      return null;
    }
    const { latitude, longitude } = this.#position.coords;
    const response = await firstValueFrom(
      this.http.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      )
    );
    return response;
  }
}
