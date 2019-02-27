import { Component, Input, OnChanges } from "@angular/core";

@Component({
  selector: "app-progress-bar",
  templateUrl: "./progress-bar.component.html",
  styleUrls: ["./progress-bar.component.css"]
})
export class ProgressBarComponent implements OnChanges {
  @Input()
  tasks: any;
  tasksEverage: number = 0;
  tasksDone: number = 0;

  ngOnChanges() {
    if (this.tasks) {
      this.tasksEverage = this.tasks.length;
      this.tasksDone = this.tasks.filter(
        task => task.isChecked === true
      ).length;
    }
  }
}
