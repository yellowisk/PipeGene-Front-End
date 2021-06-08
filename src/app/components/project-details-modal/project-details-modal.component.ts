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

  project: IProject;

  constructor(
    private readonly modalService: BsModalService,
    private readonly projectService: ProjectService,
    private readonly router: Router
    ) {}

  ngOnInit(): void {
  }

  setDetails(data: IProject) {
    this.project = data;
    this.modalRef = this.modalService.show(this.modal);
  }

  deleteProject() {
    this.projectService.deleteProject(this.project.id);
  }


  setEditMode() {
    this.modalRef.hide();
    this.router.navigate([`/projects/edit/`], { queryParams: {id : this.project.id} })
  }

}
