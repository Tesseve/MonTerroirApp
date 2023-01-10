import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-input-text',
  templateUrl: './form-input-text.component.html',
  styleUrls: ['./form-input-text.component.scss'],
})
export class FormInputTextComponent implements OnInit {
  @Input() label: string = 'Label';
  @Input() placeholder: string = 'Label';
  @Input() type: string = 'text';
  @Output() valueChange = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onValueChanged(event: any) {
    console.log('onValueChanged', event.target.value);
    this.valueChange.emit(event.target.value);
  }
}
