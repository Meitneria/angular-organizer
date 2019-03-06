import { Component, OnInit } from "@angular/core";
import { TasksService } from "../../services/tasks.service";
import * as moment from "moment";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
  providers: [TasksService]
})
export class TasksComponent implements OnInit {
  taskArray: any;
  public itemTitle: string;
  public itemInfo: string;
  projectId: string;

  project = { name: "Project" };

  constructor(
    private taskService: TasksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.itemTitle = "";
    this.itemInfo = "";
    this.projectId = this.route.snapshot.paramMap.get("id");
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
