import { User } from "firebase";
import { Project } from "./../../models/projects";
import { ProjectsService } from "./../../services/projects.service";
import { Component, OnInit } from "@angular/core";
import { TasksService } from "../../services/tasks.service";
import * as moment from "moment";
import { v4 as uuid } from "uuid";
import { ActivatedRoute } from "@angular/router";
import { Task } from "src/app/models/tasks";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
  providers: [TasksService, ProjectsService]
})
export class TasksComponent implements OnInit {
  usersArray: User[] = [];
  searchableUsers: User[] = [];
  projectId: string;
  taskArray: Task[];
  currentProject: Project;
  itemTitle: string;
  itemInfo: string;

  constructor(
    private taskService: TasksService,
    private projectsService: ProjectsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.itemTitle = "";
    this.itemInfo = "";
    this.projectId = this.route.snapshot.paramMap.get("id");
    this.projectsService
      .getProject(this.projectId)
      .subscribe(data => (this.currentProject = data));

    this.projectsService
      .getUsersId(this.projectId)
      .subscribe(usersInProject => {
        this.usersArray = [];
        this.projectsService.getUsers(usersInProject).map(item => {
          item.subscribe(user => {
            this.usersArray.push(...user);
          });
        });
      });

    this.taskService.CheckAccess(this.projectId).subscribe(data => {
      if (data.length) {
        this.taskService.getTasks(this.projectId).subscribe(data => {
          this.taskArray = data;
        });
      }
    });
  }

  onChange(event) {
    this.projectsService.getUsersByEmail(event).subscribe(user => {
      this.searchableUsers = user
    });
  }

  isUserInProject(user) {
    return !this.usersArray.find(item => item.uid === user.uid);
  }

  addUserToProject(userId) {
    this.projectsService.addUserToProject(userId, this.projectId);
  }

  onRemoveUser(userId: string) {
    this.projectsService.removeUserFromProject(userId, this.projectId);
  }

  onAdd(newTask: any) {
    const id = uuid();
    const task = {
      title: newTask.itemTitle,
      info: newTask.itemInfo,
      date: moment().format(),
      isChecked: false,
      id: id,
      projectId: this.projectId
    };
    this.taskService.SetTasksData(task, id);
    this.itemTitle = "";
    this.itemInfo = "";
  }

  onRemove($key: string) {
    this.taskService.RemoveTitle($key);
  }
  onEdit(task: Task) {
    this.taskService.EditTitle(task);
  }
}
