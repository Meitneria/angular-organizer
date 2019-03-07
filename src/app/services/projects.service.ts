import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { v4 as uuid } from "uuid";
import { UserInfo, User } from "firebase";
import { Project } from "../models/projects";
import { Connection } from "../models/connection";

import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";

@Injectable({
  providedIn: "root"
})
export class ProjectsService {
  user: UserInfo;
  constructor(
    private store: Store<any>,
    public afs: AngularFirestore,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.store.select("user").subscribe(data => (this.user = data.user));
  }

  getProjectsId() {
    return this.afs
      .collection<Connection>("user_project", ref =>
        ref.where("userId", "==", this.user.uid)
      )
      .valueChanges();
  }

  getProject(projectId: string) {
    return this.afs
      .collection("projects")
      .doc<Project>(projectId)
      .valueChanges();
  }

  getUsersId(projectId: string) {
    return this.afs
      .collection<Connection>("user_project", ref =>
        ref.where("projectId", "==", projectId)
      )
      .valueChanges();
  }

  getUsers(data) {
    return data.map(item =>
      this.afs
        .collection<User>("users", ref => ref.where("uid", "==", item.userId))
        .valueChanges()
    );
  }

  async SetProjectData(project: Project, id: string) {
    const projectRef: AngularFirestoreDocument<any> = this.afs.doc<Project>(
      `projects/${id}`
    );
    const connectionId = uuid();
    const connectionRef: AngularFirestoreDocument<any> = this.afs.doc<
      Connection
    >(`user_project/${connectionId}`);
    connectionRef.set(
      { projectId: id, userId: this.user.uid },
      { merge: true }
    );
    return projectRef
      .set(project, {
        merge: true
      })
      .then(() => {
        this.ngZone.run(() => {
          this.router.navigate([`project/${id}`]);
        });
      });
  }
}
