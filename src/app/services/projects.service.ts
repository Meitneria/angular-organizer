import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { v4 as uuid } from "uuid";

import { UserInfo } from "firebase";

import { SetUser } from "../resource/user/user.actions";
import { Project } from "../models/projects";

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

  SetProjectData(project: Project, id: string) {
    const projectRef: AngularFirestoreDocument<any> = this.afs.doc(
      `projects/${id}`
    );
    const connectionId = uuid();
    const connectionRef: AngularFirestoreDocument<any> = this.afs.doc(
      `user_project/${connectionId}`
    );
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