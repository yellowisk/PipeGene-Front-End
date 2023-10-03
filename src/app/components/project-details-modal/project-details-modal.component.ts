import { ErrorService } from 'src/app/services/error.service';
import { ExecutionService } from './../../views/main/executions/execution.service';
import { Router } from '@angular/router';
import { ProjectService } from './../../views/main/projects/project.service';
import { IProject } from 'src/app/interfaces/project.interface';
import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMap } from 'src/app/enums/error-code.enum';
import { IUser } from 'src/app/interfaces/auth.interface';

@Component({
  selector: 'app-project-details-modal',
  templateUrl: './project-details-modal.component.html',
  styleUrls: ['./project-details-modal.component.scss'],
})
export class ProjectDetailsModalComponent implements OnInit {
  @Output() refresh: EventEmitter<any> = new EventEmitter();
  @ViewChild('modal') modal: TemplateRef<any>;
  modalRef: BsModalRef;
  executions: any[] = [];
  users: IUser[] = [];
  isOwner: boolean;

  project: IProject;

  constructor(
    private readonly modalService: BsModalService,
    private readonly projectService: ProjectService,
    private readonly executionService: ExecutionService,
    private readonly errorService: ErrorService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  setDetails(data: IProject): void {
    this.project = data;
    this.modalRef = this.modalService.show(this.modal);
    this.getUsers();
    this.checkProjectOwnership(this.project.id);
    this.executionService.listProjectExecutions(data.id).subscribe(
      (response) => {
        this.executions = response;
      },
      (error: HttpErrorResponse) => {
        this.errorService.setError(ErrorMap.get('FAILED_TO_GET'));
      }
    );
  }

  deleteProject(): void {
    this.projectService.deleteProject(this.project.id).subscribe(
      (response) => {
        this.modalRef.hide();
        this.refresh.emit();
      },
      (error: HttpErrorResponse) => {
        this.errorService.setError(ErrorMap.get('FAILED_TO_DELETE_PROJECT'));
      }
    );
  }

  getUsers(): void {
    this.projectService.getUsersInProject(this.project.id).subscribe(
      (response) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        this.errorService.setError(ErrorMap.get('FAILED_TO_GET'));
      }
    );
  }

  setEditMode(): void {
    this.modalRef.hide();
    this.router.navigate([`/projects/edit/`], {
      queryParams: { id: this.project.id },
    });
  }

  checkProjectOwnership(projectId: string): void {
    this.projectService.isOwner(projectId).subscribe((isOwner) => {
      this.isOwner = isOwner;

    });
  }

  leaveGroup(): void {
    this.projectService.leaveGroup(this.project.id).subscribe(
      () =>  {
        this.modalRef.hide();
        this.refresh.emit();
      }
    )
  }
}
