import { AfterViewInit, Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import * as L from 'leaflet';
import { Productor } from 'src/app/models/Productor';
import { PositionService } from 'src/app/shared/services/gps/position.service';
import { ProductorService } from 'src/app/shared/services/models/productor/productor.service';

@Component({
  selector: 'app-productor-map',
  templateUrl: './productor-map.page.html',
  styleUrls: ['./productor-map.page.scss'],
})
export class ProductorMapPage implements AfterViewInit {
  map: L.Map | undefined;

  swissBounds = L.latLngBounds(L.latLng(45, 5), L.latLng(48, 11));

  markers: L.Marker[] = [];

  distanceToFetchProductor = 6500;

  constructor(
    private positionService: PositionService,
    private navController: NavController,
    private productorService: ProductorService
  ) {}

  ngAfterViewInit(): void {
    this.init();
  }

  goToMap() {
    this.navController.navigateForward('explore', { animated: false });
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
      shouldKeepDisplayedMarker: true,
    });

    await this.loadAndAddProductorsOnMap({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
  }

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

    //detect if center map move
    this.map.on('moveend', async () => {
      const center = this.map!.getCenter();

      await this.loadAndAddProductorsOnMap({
        lat: center.lat,
        long: center.lng,
      });
    });

    this.map.on('zoomend', async () => {
      const zoom = this.map!.getZoom();
      const distance = this.getDistanceFromZoom(zoom);
      this.distanceToFetchProductor = distance;

      const center = this.map!.getCenter();
      await this.loadAndAddProductorsOnMap({
        lat: center.lat,
        long: center.lng,
      });
    });
  }

  private addMarker(
    lat: number,
    lng: number,

    {
      icon = 'pin',
      shouldKeepDisplayedMarker = false,
      productor,
    }: {
      icon?: string;
      shouldKeepDisplayedMarker?: boolean;
      productor?: Productor;
    }
  ): void {
    if (!this.map) return;
    const marker = L.marker([lat, lng], {
      icon: L.icon({
        iconSize: [30, 30],
        iconUrl: 'assets/icon/' + icon + '.svg',
      }),
    })
      .addTo(this.map)
      .on('click', () => {
        if (productor) {
          if (!this.map) return;
          /* marker.bindTooltip(
        `
        <div class="map-tooltip" style="background-image:url('https://picsum.photos/200/200')">
          <div class="map-tooltip__header" style="color:white;height:100px;display:flex;justify-content:flex-end;">
            <h3>${productor?.username}</h3>
          </div>
        </div>
        `,
        {
          permanent: false,
          direction: 'top',
          interactive: true,
        }
      ); */
          var tooltip = L.tooltip({
            permanent: false,
            direction: 'top',
            interactive: true,
            content: `
            <div class="map-tooltip" style="background-image:url('https://picsum.photos/200/200')">
              <div class="map-tooltip__header" style="color:white;height:100px;display:flex;justify-content:flex-end;">
                <h3>${productor?.username}</h3>
              </div>
            </div>
            `,
          })
            .setLatLng([lat, lng])
            .addTo(this.map)
            .on('click', () => {
              console.log('click on productor' + productor?.username);
            });
        }
      });

    if (!shouldKeepDisplayedMarker) {
      this.markers.push(marker);
    }
  }

  private async loadAndAddProductorsOnMap({ lat = 0, long = 0 } = {}) {
    this.addProductorsOnMap(await this.loadProductors({ lat, long }));
  }

  private async loadProductors({ lat = 0, long = 0 } = {}) {
    return await this.productorService.getAllNearby({
      location: `${lat},${long}`,
      distance: this.distanceToFetchProductor,
      forceFetchio: true,
    });
  }

  private addProductorsOnMap(productors: Productor[]) {
    this.removeMarkers();
    for (const productor of productors) {
      this.addMarker(
        productor.location.coordinates[0],
        productor.location.coordinates[1],
        { productor }
      );
    }
  }

  private removeMarkers() {
    if (!this.map) return;
    for (const marker of this.markers) {
      this.map.removeLayer(marker);
    }
  }

  private getDistanceFromZoom(zoom: number) {
    const dict: any = {
      18: 1000, //min value is 325
      17: 2000, //min value is 650
      16: 4000, //min value is 1300
      15: 8000, //min value is 2600
      14: 10000, //min value is 3250
      13: 15000, //min value is 6500
      12: 20000, //min value is 13000
      11: 35000, //min value is 26000
      10: 60000, //min value is 52000
      9: 150000, //min value is 104000
    };
    return dict[zoom];
  }
}
