import { ErrorService } from './../../../services/error.service';
import { ProjectDetailsModalComponent } from './../../../components/project-details-modal/project-details-modal.component';
import { IProject } from 'src/app/interfaces/project.interface';
import { ProjectService } from './project.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMap } from 'src/app/enums/error-code.enum';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  @ViewChild('detailsModal')
  readonly detailsModal: ProjectDetailsModalComponent;
  projects: IProject[] = [];

  constructor(
    private readonly projectService: ProjectService,
    private readonly errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.listProjects().subscribe(
      (response) => {
        this.projects = response;
      },
      (error: HttpErrorResponse) => {
        this.errorService.setError(ErrorMap.get('FAILED_TO_GET'));
      }
    );
  }

  showProjectDetails(project: IProject): void {
    this.detailsModal.setDetails(project);
  }
}
