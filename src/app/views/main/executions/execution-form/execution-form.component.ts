import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ExecutionService } from './../execution.service';
import { IProject } from './../../../../interfaces/project.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ProjectService } from '../../projects/project.service';

@Component({
  selector: 'app-execution-form',
  templateUrl: './execution-form.component.html',
  styleUrls: ['./execution-form.component.scss'],
})
export class ExecutionFormComponent implements OnInit {
  executionForm: FormGroup;

  projects: IProject[];
  selectedProject: IProject;
  // pipelines: IPipelines[];

  constructor(
    private readonly projectService: ProjectService,
    private readonly executionService: ExecutionService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.executionForm = this.formBuilder.group({
      description: [null, [Validators.required]],
      project: [null, [Validators.required]],
      dataset: [null, [Validators.required]],
      pipeline: [null, [Validators.required]],
    });

    this.executionForm.get('project').valueChanges.subscribe((value) => {
      this.selectedProject = this.projects.filter(
        (project) => project.id === value
      )[0];
    });

    this.getProjects();
  }

  getProjects(): void {
    this.projectService.listProjects().subscribe((response) => {
      this.projects = response;
    });
  }

  createExecution(): any {
    if (!this.validateForm()) { return; }
    this.executionService.createExecution(this.executionForm.value).subscribe(
      () => {
        this.router.navigate(['/executions']);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
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
