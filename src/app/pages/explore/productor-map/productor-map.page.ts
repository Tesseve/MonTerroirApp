import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-productor-map',
  templateUrl: './productor-map.page.html',
  styleUrls: ['./productor-map.page.scss'],
})
export class ProductorMapPage implements AfterViewInit {
  map: L.Map | undefined;

  swissBounds = L.latLngBounds(L.latLng(45, 5), L.latLng(48, 11));

  private initMap(): void {
    this.map = L.map('map', {
      center: [46.77529, 6.637531],
      zoom: 13,
      maxBoundsViscosity: 1,
    });

    const tiles = L.tileLayer(
      'https://tile.osm.ch/switzerland/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 9,
        bounds: this.swissBounds,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    this.map.setMaxBounds(this.swissBounds);

    tiles.addTo(this.map);
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }
}
