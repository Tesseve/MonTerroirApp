import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-productor-map',
  templateUrl: './productor-map.page.html',
  styleUrls: ['./productor-map.page.scss'],
})
export class ProductorMapPage implements AfterViewInit {
  map: L.Map | undefined;

  private initMap(): void {
    this.map = L.map('map', {
      center: [46.77529, 6.637531],
      zoom: 16,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }
}
