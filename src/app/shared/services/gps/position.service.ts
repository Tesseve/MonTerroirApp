import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  #position?: Position | null;

  constructor() {
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
}
