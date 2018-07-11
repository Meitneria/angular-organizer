import { Component, OnInit, Input } from '@angular/core';
import { TasksService} from './tasks.service';
import { Task } from './task';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TasksService]
})


export class TasksComponent implements OnInit {
  taskArray: any;
  activateEdit = false;
  public itemTitle: string;
  public itemInfo: string;

  constructor(private taskService: TasksService) {}

  ngOnInit() {
    this.itemTitle = '';
    this.itemInfo = '';
    this.taskService.getToDoList().snapshotChanges()
    .subscribe(item => {
      this.taskArray = [];
      item.forEach(element => {
        const data = element.payload.toJSON();
        data['$key'] = element.key;
        this.taskArray.push(data);
      });
      this.taskArray.sort((a, b) => {
        return a.isChecked - b.isChecked;
      });
    });
  }

  private onAdd(itemTitle: string, itemInfo: string): void {
    debugger;
    const date = Date.now();
    this.taskService.addTitle(itemTitle, itemInfo, date);
    this.itemTitle = '';
    this.itemInfo = '';
  }
}
