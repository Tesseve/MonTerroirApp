import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ProductService } from '../shared/services/models/product/product.service';
import { WebsocketService } from '../shared/services/websocket.service';

declare type PageTab = {
  title: string; // The title of the tab in the tab bar
  icon: string; // The icon of the tab in the tab bar
  path: string; // The route's path of the tab to display
};

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})
export class LayoutPage implements OnInit, OnDestroy {
  title = 'Mon terroir';
  tabs: PageTab[];

  constructor(
    private auth: AuthService,
    private productService: ProductService
  ) {
    this.tabs = [
      { title: 'Accueil', icon: 'home-sharp', path: 'home' },
      { title: 'Explore', icon: 'search-sharp', path: 'explore' },
      {
        title: 'Messages',
        icon: 'chatbubble-ellipses-sharp',
        path: 'conversations',
      },
      { title: 'Profil', icon: 'person-circle-sharp', path: 'profil' },
    ];
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
