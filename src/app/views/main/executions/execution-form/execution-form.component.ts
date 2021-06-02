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

  steps: any[] = [];
  services: any[] = [
    {
      id: 1,
      name: 'Serviço de processamento',
      outputTypes: ['PDF', 'CSV'],
    },
  ];
  projects: any[] = [];

  constructor(
    private readonly projectService: ProjectService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.executionForm = this.formBuilder.group({
      executionName: [null, [Validators.required]],
      project: [null, [Validators.required]],
      dataset: [null, [Validators.required]],
      steps: this.formBuilder.array([
        this.formBuilder.group({
          service: [null, [Validators.required]],
          outputFormat: [null, [Validators.required]],
        }),
      ]),
    });
    this.getProjects();
  }

  getProjects() {
    this.projects = this.projectService.listProjects();
  }

  createExecution(): any {
    console.log(this.executionForm.value)
  }

  initStepRow(): FormGroup {
    return this.formBuilder.group({
      service: [null, [Validators.required]],
      outputFormat: [null, [Validators.required]],
    });
  }

  addStep(): void {
    console.log(this.steps);
    this.steps.push(this.steps.length + 1);
    const stepsArray = <FormArray>this.executionForm.controls['steps'];
    stepsArray.push(this.initStepRow());
  }
}
