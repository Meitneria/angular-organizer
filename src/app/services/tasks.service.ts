import {
  AngularFirestore,
} from "angularfire2/firestore";
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Task } from "../models/tasks";

@Injectable({
  providedIn: "root"
})
export class TasksService {
  toDoList: AngularFireList<any>;
  userId: string;

  constructor(
    private firebasedb: AngularFireDatabase,
    private afs: AngularFirestore
  ) {
    this.userId = JSON.parse(localStorage.getItem("user")).uid;
  }

  CheckAccess(projectId: string) {
    return this.afs.collection("user_project", ref => ref
      .where("userId", "==", this.userId)
      .where("projectId", "==", projectId))
      .valueChanges();
  }

  getTasks(projectId: string) {
    return this.afs.collection("tasks", ref => ref
      .where("projectId", "==", projectId))
      .valueChanges();
  }

  SetTasksData(task: Task, id: string) {
    const projectRef = this.afs.doc(`tasks/${id}`);
    return projectRef.set(task);
  }

  CheckTitle(task: Task) {
    this.afs.doc(`tasks/${task.id}`).set({ ...task });
  }
  RemoveTitle(id: string) {
    this.afs.doc(`tasks/${id}`).delete();
  }

  getUncheckedCount() {
    const starCountRef = this.firebasedb.database.ref("titles/" + this.userId);
    const promise = new Promise(resolve => {
      starCountRef.on("value", snapshot => {
        let count: number;
        if (snapshot.val()) {
          count = Object.values(snapshot.val()).filter(
            (item: Task) => !item.isChecked
          ).length;
        } else {
          count = 0;
        }
        resolve(count);
      });
    });
    return promise;
  }
}
