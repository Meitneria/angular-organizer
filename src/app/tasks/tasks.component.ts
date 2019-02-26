import { Component, OnInit } from '@angular/core';
import { TasksService} from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TasksService]
})


export class TasksComponent implements OnInit {
  taskArray: any;
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
  onAdd(newTask: any) {
    const date = Date.now();
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
