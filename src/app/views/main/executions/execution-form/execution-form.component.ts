import { ErrorMap } from 'src/app/enums/error-code.enum';
import { ErrorService } from 'src/app/services/error.service';
import { PipelineService } from './../../pipelines/pipeline.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ExecutionService } from './../execution.service';
import { IProject } from './../../../../interfaces/project.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ProjectService } from '../../projects/project.service';
import { IPipeline } from 'src/app/interfaces/pipeline.interface';

@Component({
  selector: 'app-execution-form',
  templateUrl: './execution-form.component.html',
  styleUrls: ['./execution-form.component.scss'],
})
export class ExecutionFormComponent implements OnInit {
  executionForm: FormGroup;

  projects: IProject[];
  selectedProject: IProject;

  pipelines: IPipeline[] = [];

  constructor(
    private readonly projectService: ProjectService,
    private readonly executionService: ExecutionService,
    private readonly pipelineService: PipelineService,
    private readonly formBuilder: FormBuilder,
    private readonly errorService: ErrorService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.executionForm = this.formBuilder.group({
      description: [null, [Validators.required]],
      projectId: [null, [Validators.required]],
      datasetId: [null, [Validators.required]],
      pipelineId: [null, [Validators.required]],
    });

    this.executionForm.get('projectId').valueChanges.subscribe((value) => {
      this.selectedProject = this.projects.filter(
        (project) => project.id === value
      )[0];
      this.getPipelines(this.selectedProject.id);
    });

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

  getPipelines(id: string): void {
    this.pipelineService.listProjectPipelines(id).subscribe(
      (response) => {
        this.pipelines = response;
      },
      (error: HttpErrorResponse) => {
        this.errorService.setError(ErrorMap.get('FAILED_TO_GET'));
      }
    );
  }

  createExecution(): any {
    if (!this.validateForm()) {
      return;
    }
    this.executionService
      .createExecution(
        {
          datasetId: this.executionForm.get('datasetId').value,
          pipelineId: this.executionForm.get('pipelineId').value,
          description: this.executionForm.get('description').value,
        },
        this.executionForm.get('projectId').value
      )
      .subscribe(
        () => {
          this.router.navigate(['/executions']);
        },
        (error: HttpErrorResponse) => {
          this.errorService.setError(ErrorMap.get('FAILED_TO_POST'));
        }
      );
  }

  getControlError(control: string): boolean {
    const formControl = this.executionForm.get(control);
    return formControl.errors && formControl.touched;
  }

  validateForm(): boolean {
    if (this.executionForm.valid) {
      return true;
    }
    this.executionForm.markAllAsTouched();
    return false;
  }
}
