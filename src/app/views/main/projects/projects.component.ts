import { ProjectDetailsModalComponent } from './../../../components/project-details-modal/project-details-modal.component';
import { IProject } from "src/app/interfaces/project.interface";
import { ProjectService } from "./project.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
})
export class ProjectsComponent implements OnInit {
  @ViewChild('detailsModal') readonly detailsModal: ProjectDetailsModalComponent;
  projects: IProject[];

  constructor(private readonly projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.projectService.listProjects().subscribe(
      (response) => {
        this.projects = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  showProjectDetails(project: IProject) {
    this.detailsModal.setDetails(project);
  }
}
