import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  toDoList: AngularFireList <any>;
  constructor(private firebasedb: AngularFireDatabase) {}
    getToDoList() {
      this.toDoList = this.firebasedb.list('titles');
      return this.toDoList;
    }
    public addTitle(title: string, info: string, date: number): void {
    this.toDoList.push({
      title: title,
      info: info,
      date: date,
      isChecked: false
    });
    }

  CheckTitle($key: string, flag: boolean) {
    this.toDoList.update($key, { isChecked: !flag});
  }
  RemoveTitle($key: string) {
    this.toDoList.remove($key);
  }
}
