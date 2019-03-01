import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.css']
})
export class TaskInputComponent {
  @Output()
  add: EventEmitter<any> = new EventEmitter();
  public itemTitle: string;
  public itemInfo: string;
  onAdd(itemTitle: string, itemInfo: string) {
    this.add.emit({ itemTitle: this.itemTitle, itemInfo: this.itemInfo });
    this.itemTitle = '';
    this.itemInfo = '';
  }
}
