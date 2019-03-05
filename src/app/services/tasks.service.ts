import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Task } from '../models/tasks';

@Injectable({
  providedIn: 'root'
})

export class TasksService {
  toDoList: AngularFireList<any>;
  userId: string;

  constructor(private firebasedb: AngularFireDatabase) {
    this.userId = JSON.parse(localStorage.getItem('user')).uid;
  }

  getToDoList() {
    this.toDoList = this.firebasedb.list('titles/' + this.userId);
    return this.toDoList;
  }

  public addTitle(title: string, info: string = null, date: string): void {
    this.firebasedb.database.ref('titles').push().key;
    this.firebasedb.database.ref('titles/' + this.userId).push({
      title: title,
      info: info,
      date: date,
      isChecked: false
    });
  }

  CheckTitle($key: string, flag: boolean) {
    this.toDoList.update($key, { isChecked: !flag });
  }
  RemoveTitle($key: string) {
    this.toDoList.remove($key);
  }

  getUncheckedCount() {
    const starCountRef = this.firebasedb.database.ref("titles/" + this.userId);
    const promise = new Promise(resolve => {
      starCountRef.on('value', snapshot => {
        let count: number;
        if (snapshot.val()) {
          count = Object.values(snapshot.val()).filter((item: Task) => !item.isChecked).length;
        } else {
          count = 0;
        }
        resolve(count)
      });
    });
    return promise;
  }
}
