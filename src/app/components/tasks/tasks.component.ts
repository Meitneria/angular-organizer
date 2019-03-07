import { Component, OnInit } from "@angular/core";
import { TasksService } from "../../services/tasks.service";
import { ProjectsService } from "./../../services/projects.service";
import * as moment from "moment";
import { v4 as uuid } from "uuid";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
  providers: [TasksService]
})
export class TasksComponent implements OnInit {
  taskArray: any;
  usersArray = [];
  public itemTitle: string;
  public itemInfo: string;
  projectId: string;

  project = { name: "Project" };

  constructor(
    private taskService: TasksService,
    private projectsService: ProjectsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.itemTitle = "";
    this.itemInfo = "";
    this.projectId = this.route.snapshot.paramMap.get("id");

    this.projectsService.getUsersId(this.projectId).subscribe(data => {
      this.projectsService.getUsers(data).map(item => {
        item.subscribe(data => {
          this.usersArray.push(...data);
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

  onAdd(newTask: any) {
    const id = uuid();
    const task = {
      title: newTask.itemTitle,
      info: newTask.itemInfo,
      date: moment().format(),
      isChecked: false,
      id: id,
      projectId: this.projectId
    }
    this.taskService.SetTasksData(task, id);
    this.itemTitle = "";
    this.itemInfo = "";
  }
  onCheck(task: any) {
    this.taskService.CheckTitle(task);
  }
  onRemove($key: string) {
    this.taskService.RemoveTitle($key);
  }
}
