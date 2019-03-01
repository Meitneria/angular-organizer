import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { TasksService} from '../components/tasks/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [TasksService]
})

export class HomeComponent  implements OnInit {
  tasksCount: any = 0;
  countLoading: boolean = true;
  notificationKey = 'Tasks';

  ngOnInit() {
    this.taskService.getUncheckedCount()
    .then(res => {
      this.tasksCount = res,
      this.countLoading = false
    })
  }



  constructor(private taskService: TasksService) {}
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
