import { ProjectsService } from "./../../services/projects.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import * as moment from "moment";
import { v4 as uuid } from "uuid";
import { Project } from "./../../models/projects";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"]
})
export class ProjectsComponent {
  formIsOpen: boolean = false;
  titleFormControl = new FormControl("", [Validators.required]);

  constructor(private projectsService: ProjectsService) {}

  openForm() {
    this.formIsOpen = !this.formIsOpen;
  }

  createProject(projectTitle: string) {
    const date = moment().format();
    const id = uuid();
    const projectData: Project = {
      title: projectTitle,
      date: date,
      id: id
    };
    this.projectsService.SetProjectData(projectData, id);
  }
}
