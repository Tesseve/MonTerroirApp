import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Productor } from 'src/app/models/Productor';

@Component({
  selector: 'app-card-productor',
  templateUrl: './card-productor.component.html',
  styleUrls: ['./card-productor.component.scss'],
})
export class CardProductorComponent implements OnInit {
  @Input() productor?: Productor;
  constructor(private router: Router) {}

  ngOnInit() {
    console.log(this.productor);
  }

  goToProductor() {
    this.router.navigate(['productors', this.productor?._id]);
  }
}
