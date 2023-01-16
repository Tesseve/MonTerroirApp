import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/models/Review';

import { Input } from '@angular/core';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.scss'],
})
export class ReviewItemComponent implements OnInit {
  @Input() review?: Review;
  constructor() {}

  ngOnInit() {}
}
