import { AfterViewInit, Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import * as L from 'leaflet';
import { PositionService } from 'src/app/shared/services/gps/position.service';

@Component({
  selector: 'app-productor-map',
  templateUrl: './productor-map.page.html',
  styleUrls: ['./productor-map.page.scss'],
})
export class ProductorMapPage implements AfterViewInit {
  map: L.Map | undefined;

  swissBounds = L.latLngBounds(L.latLng(45, 5), L.latLng(48, 11));

  private initMap({ lat = 46.77529, long = 6.637531 } = {}): void {
    this.map = L.map('map', {
      center: [lat, long],
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

  private addMarker(lat: number, lng: number, { icon = 'pin' } = {}): void {
    const marker = L.marker([lat, lng], {
      icon: L.icon({
        iconSize: [30, 30],
        iconUrl: 'assets/icon/' + icon + '.svg',
      }),
    })
      .addTo(this.map!)
      .on('click', async () => {
        const toast = await this.toastController.create({
          message: 'Marker clicked',
          duration: 2000,
          position: 'top',
        });
        await toast.present();
      });
    console.log(marker);
  }

  constructor(
    private positionService: PositionService,
    private toastController: ToastController
  ) {}

  ngAfterViewInit(): void {
    this.init();
  }

  private async init() {
    const position = await this.positionService.getCurrentPosition();
    if (!position) {
      this.initMap();
      return;
    }
    this.initMap({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
    this.addMarker(position.coords.latitude, position.coords.longitude, {
      icon: 'home',
    });
    this.addMarker(
      position.coords.latitude - 0.01,
      position.coords.longitude + 0.01
    );
    this.addMarker(
      position.coords.latitude - 0.015,
      position.coords.longitude - 0.015
    );

    this.addMarker(
      position.coords.latitude - 0.02,
      position.coords.longitude - 0.01
    );
  }
}
