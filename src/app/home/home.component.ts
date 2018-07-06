import { Component, OnInit } from '@angular/core';
import {trigger, state, style, transition, animate, keyframes} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[
    trigger('myAnim', [
      state('small', style({
        transform: 'scale(1)',
      })),
      state('large', style({
        transform: 'translateY(-10%) scale(1.1)',
      })),
      transition('small <=> large', animate('200ms ease-out')),
    ]),
  ]
})
export class HomeComponent implements OnInit {
  state = 'small';

  constructor() { }

  ngOnInit() {
  }
  animateMe() {
    this.state = 'large';
  }

}
