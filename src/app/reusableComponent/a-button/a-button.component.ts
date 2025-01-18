import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-a-button',
  imports: [],
  templateUrl: './a-button.component.html',
  styleUrl: './a-button.component.css'
})
export class AButtonComponent {

  @Input() btnText: String = '';
  @Input() btnClass: String = '';

  @Output() onBtnClicked = new EventEmitter<any>();

  onClick() {
    debugger;
    this.onBtnClicked.emit('admin');
  }

}
