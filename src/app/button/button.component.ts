import {Component, Input, Output, ViewEncapsulation, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-custom-button',
  template: `
   <button (click)="handleClick()">{{label}}</button>
  `,
  styles: [`
  button {
    border: none;
    border-radius: 30px;
    padding: 8px 10px;
    background: #9370DB;
    font-size: 10px;
    color: white;
    text-transform: uppercase;
    fint-weight:600;
  }
    button:active{
      outline: none;
    }
  `],
  encapsulation: ViewEncapsulation.Native
})
export class ButtonComponent {
@Input() label = 'label';
@Output() action = new EventEmitter<number>();
private clickCt = 0;

handleClick() {
  this.clickCt++;
  this.action.emit(this.clickCt);
  console.log(this.clickCt);
}
}
