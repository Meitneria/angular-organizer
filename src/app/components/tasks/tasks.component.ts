import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import * as moment from 'moment';
import { Task } from '../../models/tasks'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TasksService]
})
export class TasksComponent implements OnInit {
  taskArray: Task[];
  public itemTitle: string;
  public itemInfo: string;

  constructor(private taskService: TasksService) {}

  ngOnInit() {
    this.itemTitle = '';
    this.itemInfo = '';
    this.taskService
      .getToDoList()
      .snapshotChanges()
      .subscribe(item => {
        this.taskArray = [];
        item.forEach(element => {
          const data: any = element.payload.toJSON();
          data['$key'] = element.key;
          data.time = moment(data.date).format('h:mm');
          data.dateFromNow = moment(data.date).fromNow();
          this.taskArray.push(data);
        });
        this.taskArray.sort((a: any, b: any) => {
          return a.isChecked - b.isChecked;
        });
      });
  }

  onAdd(newTask: any) {
    const date = moment().format();
    this.taskService.addTitle(newTask.itemTitle, newTask.itemInfo, date);
    this.itemTitle = '';
    this.itemInfo = '';
  }
  onCheck(keys: any) {
    this.taskService.CheckTitle(keys.key, keys.checked);
  }
  onRemove($key: string) {
    this.taskService.RemoveTitle($key);
  }
}
