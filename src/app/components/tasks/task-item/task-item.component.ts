import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges
} from "@angular/core";
import { Task } from "./../../../models/tasks";
import * as moment from "moment";

@Component({
  selector: "app-task-item",
  templateUrl: "./task-item.component.html",
  styleUrls: ["./task-item.component.css"]
})
export class TaskItemComponent implements OnChanges {
  @Input()
  task: Task;
  @Output()
  remove: EventEmitter<any> = new EventEmitter();
  @Output()
  edit: EventEmitter<any> = new EventEmitter();

  time: string;
  dateFromNow: string;
  isEditingFormOpen: boolean = false;

  ngOnChanges() {
    this.time = moment(this.task.date).format("h:mm");
    this.dateFromNow = moment(this.task.date).fromNow();
  }

  onRemove($key: string) {
    this.remove.emit($key);
  }

  onCheck(task: Task) {
    this.edit.emit({ ...task, isChecked: !task.isChecked });
  }

  onEdit(task: Task) {
    this.isEditingFormOpen = !this.isEditingFormOpen;
    this.edit.emit({ ...task, title: task.title, info: task.info });
  }

  openForm() {
    this.isEditingFormOpen = !this.isEditingFormOpen;
  }
}
