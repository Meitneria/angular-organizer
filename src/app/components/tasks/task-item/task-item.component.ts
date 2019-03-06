import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { Task } from './../../../models/tasks';
import * as moment from "moment";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnChanges {
  @Input()
  task: Task;
  @Output()
  remove: EventEmitter<any> = new EventEmitter();
  @Output()
  check: EventEmitter<any> = new EventEmitter();

  time: string;
  dateFromNow: string;

  ngOnChanges() {
    console.log('change')
    this.time = moment(this.task.date).format('h:mm');
    this.dateFromNow = moment(this.task.date).fromNow();
  }

  onRemove($key: string) {
    this.remove.emit($key);
  }

  onCheck($key: string, isChecked: boolean) {
    this.check.emit({ key: $key, checked: isChecked });
  }
}
