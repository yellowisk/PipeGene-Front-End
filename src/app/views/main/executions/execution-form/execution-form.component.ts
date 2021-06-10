import { Router } from '@angular/router';
import { ExecutionService } from './../execution.service';
import { IProvider } from './../../../../interfaces/provider.interface';
import { IProject } from './../../../../interfaces/project.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ProjectService } from '../../projects/project.service';
import { ProviderService } from '../../providers/provider.service';

@Component({
  selector: 'app-execution-form',
  templateUrl: './execution-form.component.html',
  styleUrls: ['./execution-form.component.scss'],
})
export class ExecutionFormComponent implements OnInit {
  executionForm: FormGroup;
  selectedProject: IProject;
  selectedProviders: IProvider[] = [];
  providers: IProvider[];
  projects: IProject[];
  steps: any[] = [];

  constructor(
    private readonly projectService: ProjectService,
    private readonly providerService: ProviderService,
    private readonly executionService: ExecutionService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.executionForm = this.formBuilder.group({
      executionName: [null, [Validators.required]],
      project: [null, [Validators.required]],
      dataset: [null, [Validators.required]],
      executionSteps: this.formBuilder.array([]),
    });

    this.executionForm.get('project').valueChanges.subscribe((value) => {
      this.selectedProject = this.projects.filter(
        (project) => project.id === value
      )[0];
    });

    this.executionForm.get('dataset').valueChanges.subscribe((value) => {
      this.addStep();
    });

    this.getProjects();
    this.getProviders();
  }

  getProjects(): void {
    this.projectService.listProjects().subscribe((response) => {
      this.projects = response;
    });
  }

  getProviders(): void {
    this.providerService.listProviders().subscribe((response) => {
      this.providers = response;
    });
  }

  createExecution(): any {
    this.executionService.createExecution(this.executionForm.value).subscribe(response => {
      this.router.navigate(['/executions'])
    });
  }

  initStepRow(inputType: string): FormGroup {
    return this.formBuilder.group({
      providerId: [null, [Validators.required]],
      inputType: [inputType],
      outputType: [null, [Validators.required]],
    });
  }

  addStep(): void {
    this.steps.push(this.steps.length + 1);
    const stepsArray = this.executionForm.controls.executionSteps as FormArray;
    stepsArray.push(this.initStepRow(this.getFileType()));
  }

  getFileType(): string {
    if (this.executionForm.get('executionSteps').value.length > 0) {
      return this.executionForm.get('executionSteps').value[
        this.executionForm.get('executionSteps').value.length - 1
      ].outputType;
    } else {
      let file;
      const fileId = this.executionForm.get('dataset').value;

      this.projects.forEach((p) => {
        p.datasets.forEach((d) => {
          if (d.id === fileId) {
            file = d.filename;
          }
        });
      });
      return file.substring(file.lastIndexOf('.') + 1, file.length) || file;
    }
  }

  setProvider(): void {
    console.log('ola');
    this.selectedProviders.push(
      this.providers.filter(
        (p) =>
          p.id ===
          this.executionForm.get('executionSteps').value[this.steps.length - 1]
            .providerId
      )[0]
    );
    console.log(this.selectedProviders);
  }
}
