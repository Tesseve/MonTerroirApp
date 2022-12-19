import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-login',
  templateUrl: './button-login.component.html',
  styleUrls: ['./button-login.component.scss'],
})
export class ButtonLoginComponent implements OnInit {

  @Input() label: string = 'Label';
  @Input() type: string = 'primary';

  constructor() { }

  ngOnInit() { }

}
