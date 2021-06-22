import { ExecutionService } from './../../views/main/executions/execution.service';
import { Router } from '@angular/router';
import { ProjectService } from './../../views/main/projects/project.service';
import { IProject } from 'src/app/interfaces/project.interface';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-project-details-modal',
  templateUrl: './project-details-modal.component.html',
  styleUrls: ['./project-details-modal.component.scss']
})
export class ProjectDetailsModalComponent implements OnInit {
  @ViewChild('modal') modal: TemplateRef<any>;
  modalRef: BsModalRef;
  executions: any [] = [];

  project: IProject;

  constructor(
    private readonly modalService: BsModalService,
    private readonly projectService: ProjectService,
    private readonly executionService: ExecutionService,
    private readonly router: Router
    ) {}

  ngOnInit(): void {
  }

  setDetails(data: IProject): void {
    this.project = data;
    this.modalRef = this.modalService.show(this.modal);
    this.executionService.listProjectExecutions(data.id).subscribe(response => {
      this.executions = response;
      console.log(response);
    });
  }

  deleteProject(): void {
    this.projectService.deleteProject(this.project.id);
  }


  setEditMode(): void {
    this.modalRef.hide();
    this.router.navigate([`/projects/edit/`], { queryParams: {id : this.project.id} });
  }

}
