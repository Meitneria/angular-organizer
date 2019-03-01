import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFireAuth } from "@angular/fire/auth";

export class Item {
  userId: string;
}
@Injectable({
  providedIn: "root"
})
export class TasksService {
  toDoList: AngularFireList<any>;
  user: string;
  constructor(
    private firebasedb: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user.uid;
      }
    });
  }
  getToDoList() {
    this.toDoList = this.firebasedb.list("titles/" + this.user);
    return this.toDoList;
  }

  public addTitle(title: string, info: string, date: number): void {
    const newPostKey = this.firebasedb.database.ref("titles").push().key;
    this.firebasedb.database.ref("titles/" + this.user).push({
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
    const starCountRef = this.firebasedb.database.ref("titles/" + 'nHQ9CBxEFoUcCS6mAehs1JRoUo52');
    const promise = new Promise(resolve => {
      starCountRef.on('value', snapshot => {
        let count: number;
        if (snapshot.val()) {
          count = Object.values(snapshot.val()).filter(item => !item.isChecked).length;
        } else {
          count = 0;
        }
        resolve(count)
      });
    });
    return promise;
  }
}
