import { Component, Input } from '@angular/core';
import { animate, style, trigger, transition, state } from '@angular/animations';

@Component({
  selector: 'app-home-item',
  templateUrl: './home-item.component.html',
  styleUrls: ['./home-item.component.css'],
  animations: [
    trigger('activeChildAnimation', [
      state('active', style({ transform: 'translateY(-10%) scale(1.1)' })),
      state('inactive', style({ transform: 'scale(1)'})),
      transition('* <=> *', animate('200ms ease-in')),
    ])
  ],
})
export class HomeItemComponent  {
  @Input()
  id: number;
  @Input()
  item: any;
  @Input()
  set activeId(v: number) {
    if (v === undefined) {
      this._state = 'inactive';
    } else if ( v === this.id ) {
      this._state = 'active';
    }
  }
  _state = 'inactive';
  constructor() { }
}
