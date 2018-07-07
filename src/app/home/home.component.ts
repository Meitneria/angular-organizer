import { Component, Input } from '@angular/core';

export interface Item {
name: string;
icon: string;
link: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  items: Item[] = [
    {
     name: 'Calendar',
     icon: '../assets/images/icons/calendar.png',
     link: '/calendar',
    },
    {
      name: 'Tasks',
      icon: '../assets/images/icons/todo.png',
      link: '/tasks',
    },
    {
      name: 'Finance',
      icon: './assets/images/icons/wallet.png',
      link: '/finance',
    },
    {
      name: 'Shopping List',
      icon: '../assets/images/icons/list.png',
      link: '/shopping-list',
    },
    {
      name: 'Work Tracker',
      icon: '../assets/images/icons/clock.png',
      link: '/work-tracker',
    },
    {
      name: 'Notes',
      icon: '../assets/images/icons/tasks.png',
      link: '/notes',
    }
  ];
  activeIndex: number;
  onMouseEnter(index: number) {
    this.activeIndex = index;
  }
  onMouseLeave() {
    this.activeIndex = undefined;
  }
}
