import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from './../../../models/tasks';
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input()
  task: Task;
  @Output()
  remove: EventEmitter<any> = new EventEmitter();
  @Output()
  check: EventEmitter<any> = new EventEmitter();

  onRemove($key: string) {
    this.remove.emit($key);
  }

  onCheck($key: string, isChecked: boolean) {
    this.check.emit({ key: $key, checked: isChecked });
  }
}
