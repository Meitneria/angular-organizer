import { ProjectsService } from "./../../services/projects.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";
import * as moment from "moment";
import { v4 as uuid } from "uuid";
import { Project } from "./../../models/projects";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"]
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  formIsOpen: boolean = false;
  titleFormControl = new FormControl("", [Validators.required]);

  constructor(
    private projectsService: ProjectsService,
    public router: Router
  ) {}

  openForm() {
    this.formIsOpen = !this.formIsOpen;
  }

  ngOnInit() {
    this.projectsService.getProjectsId().subscribe(data => {
      this.projects = [];
      data.map(item => {
        this.projectsService
          .getProject(item.projectId)
          .subscribe(data => this.projects.push(data));
      });
    });
  }

  onRemoveProject(projectId: string) {
    this.projectsService.onRemoveProject(projectId);
  }

  openProject(projectId: string) {
    this.router.navigate([`project/${projectId}`]);
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
