import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  goTo(path: string) {
    this.navController.navigateForward(path, { animated: false });
  }

}
