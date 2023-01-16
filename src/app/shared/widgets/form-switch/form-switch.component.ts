import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-switch',
  templateUrl: './form-switch.component.html',
  styleUrls: ['./form-switch.component.scss'],
})
export class FormSwitchComponent implements OnInit {
  @Input() label: string = 'Label';
  @Input() placeholder: string = 'Label';
  @Input() type: string = 'text';
  @Output() valueChange = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onChange(event: any) {
    console.log('onChange', event.target.value);
    this.valueChange.emit(event.target.value);

  }

}
