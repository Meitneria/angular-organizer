import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root"
})
export class TasksService {
  toDoList: AngularFireList<any>;
  userId: string;
  constructor(
    private firebasedb: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }
  getToDoList() {
    this.toDoList = this.firebasedb.list("titles/" + this.userId);
    return this.toDoList;
  }

  public addTitle(title: string,  info: string = null, date: number): void {
    this.firebasedb.database.ref("titles").push().key;
    this.firebasedb.database.ref("titles/" + this.userId).push({
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

}
