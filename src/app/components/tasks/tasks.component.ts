import { Project } from "./../../models/projects";
import { ProjectsService } from "./../../services/projects.service";
import { Component, OnInit } from "@angular/core";
import { TasksService } from "../../services/tasks.service";
import * as moment from "moment";
import { ActivatedRoute } from "@angular/router";
import { Task } from "src/app/models/tasks";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
  providers: [TasksService, ProjectsService]
})
export class TasksComponent implements OnInit {
  taskArray: Task[];
  currentProject: Project;

  itemTitle: string;
  itemInfo: string;
  projectId: string;
  
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
    this.taskService.CheckAccess(this.projectId).subscribe(data => {
      if (data.length) {
        this.taskService.getTasks(this.projectId).subscribe(data => {
          this.taskArray = data;
        });
      }
    });
  }

  onAdd(newTask: any) {
    const date = moment().format();
    this.taskService.addTitle(newTask.itemTitle, newTask.itemInfo, date);
    this.itemTitle = "";
    this.itemInfo = "";
  }
  onCheck(keys: any) {
    this.taskService.CheckTitle(keys.key, keys.checked);
  }
  onRemove($key: string) {
    this.taskService.RemoveTitle($key);
  }
}
