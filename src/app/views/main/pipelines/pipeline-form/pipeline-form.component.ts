import { HttpErrorResponse } from '@angular/common/http';
import { PipelineService } from './../pipeline.service';
import { ProjectService } from './../../projects/project.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigProviderModalComponent } from 'src/app/components/config-provider-modal/config-provider-modal.component';
import { IProject } from 'src/app/interfaces/project.interface';
import { IProvider } from 'src/app/interfaces/provider.interface';
import { ProviderService } from '../../providers/provider.service';

@Component({
  selector: 'app-pipeline-form',
  templateUrl: './pipeline-form.component.html',
  styleUrls: ['./pipeline-form.component.scss'],
})
export class PipelineFormComponent implements OnInit {
  @ViewChild('configProviderModal')
  readonly configProviderModal: ConfigProviderModalComponent;
  providers: IProvider[];
  projects: IProject[];

  pipelineForm: FormGroup;
  selectedProject: IProject;
  selectedProviders: IProvider[] = [];
  steps: any[] = [];

  serviceConfigIndex: number | null;

  constructor(
    private readonly providerService: ProviderService,
    private readonly projectService: ProjectService,
    private readonly pipelineService: PipelineService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.pipelineForm = this.formBuilder.group({
      executionName: [null, [Validators.required]],
      projectId: [null, [Validators.required]],
      executionSteps: this.formBuilder.array([]),
    });

    this.pipelineForm.get('projectId').valueChanges.subscribe((value) => {
      this.selectedProject = this.projects.filter(
        (project) => project.id === value
      )[0];
      const stepsArray = this.pipelineForm.controls.executionSteps as FormArray;
      if (stepsArray.length < 1) { this.addStep(); }
    });

    this.getProviders();
    this.getProjects();
  }

  getProviders(): void {
    this.providerService.listProviders().subscribe((response) => {
      this.providers = response;
    });
  }

  getProjects(): void {
    this.projectService.listProjects().subscribe((response) => {
      this.projects = response;
    });
  }

  initStepRow(inputType: string | null): FormGroup {
    return this.formBuilder.group({
      providerId: [null, [Validators.required]],
      inputType: [inputType || ''],
      outputType: [null, [Validators.required]],
      params: [null],
    });
  }

  addStep(): void {
    this.steps.push(this.steps.length + 1);
    const stepsArray = this.pipelineForm.controls.executionSteps as FormArray;
    stepsArray.push(this.initStepRow(this.getFileType()));
  }

  getFileType(): string | null {
    if (this.pipelineForm.get('executionSteps').value.length > 0) {
      return this.pipelineForm.get('executionSteps').value[
        this.pipelineForm.get('executionSteps').value.length - 1
      ].outputType;
    }
    return null;
  }

  setProvider(index: number): void {
    this.selectedProviders[index] =
      this.providers.filter(
        (p) =>
          p.id ===
          this.pipelineForm.get('executionSteps').value[this.steps.length - 1]
            .providerId
      )[0];

  }

  initServiceConfig(index: number): void {
    this.serviceConfigIndex = index;
    this.configProviderModal.setOperations(
      this.providers.filter((p) => p.id === this.selectedProviders[index].id)[0]
        .operations
    );
  }

  saveServiceConfigs(event: any): void {
    const controlArray = this.pipelineForm.get('executionSteps') as FormArray;
    controlArray.controls[this.serviceConfigIndex]
      .get('params')
      .setValue(event);
    this.serviceConfigIndex = null;
  }

  serviceIsConfigured(index: number): boolean {
    const controlArray = this.pipelineForm.get('executionSteps') as FormArray;
    return (
      controlArray.controls[index]?.get('params').value
    );
  }

  createPipeline(): void {
    if (!this.validateForm()) { return; }
    const pipeline = this.pipelineForm.value;
    this.pipelineService.createPipeline(
      {
        description: pipeline.executionName,
        steps: pipeline.executionSteps,
      },
      pipeline.projectId
    ).subscribe(
      () => this.router.navigate(['/pipelines']),
      (error: HttpErrorResponse) => console.log(error)
    );
  }

  getControlError(control: string): boolean {
    const formControl = this.pipelineForm.get(control);
    return formControl.errors && formControl.touched;
  }

  validateForm(): boolean {
    if (this.pipelineForm.valid) {
      return true;
    }
    this.pipelineForm.markAllAsTouched();
    return false;
  }
}
