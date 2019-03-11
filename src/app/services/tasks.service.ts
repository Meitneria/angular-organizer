import { Connection } from "./../models/connection";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Injectable } from "@angular/core";
import { AngularFireList } from "angularfire2/database";
import { Task } from "../models/tasks";

@Injectable({
  providedIn: "root"
})
export class TasksService {
  toDoList: AngularFireList<any>;
  userId: string;

  constructor(private afs: AngularFirestore) {
    this.userId = JSON.parse(localStorage.getItem("user")).uid;
  }

  CheckAccess(projectId: string) {
    return this.afs
      .collection<Connection>("user_project", ref =>
        ref
          .where("userId", "==", this.userId)
          .where("projectId", "==", projectId)
      )
      .valueChanges();
  }

  getTasks(projectId: string) {
    return this.afs
      .collection<Task>("tasks", ref =>
        ref.where("projectId", "==", projectId).orderBy("isChecked")
      )
      .valueChanges();
  }

  SetTasksData(task: Task, id: string) {
    const projectRef: AngularFirestoreDocument<any> = this.afs.doc<Task>(
      `tasks/${id}`
    );
    return projectRef.set(task);
  }

  RemoveTitle(id: string) {
    this.afs.doc<Task>(`tasks/${id}`).delete();
  }
  EditTitle(task: Task) {
    this.afs.doc<Task>(`tasks/${task.id}`).set({ ...task });
  }

  // getUncheckedCount() {
  //   const starCountRef = this.firebasedb.database.ref("titles/" + this.userId);
  //   const promise = new Promise(resolve => {
  //     starCountRef.on("value", snapshot => {
  //       let count: number;
  //       if (snapshot.val()) {
  //         count = Object.values(snapshot.val()).filter(
  //           (item: Task) => !item.isChecked
  //         ).length;
  //       } else {
  //         count = 0;
  //       }
  //       resolve(count);
  //     });
  //   });
  //   return promise;
  // }
}
