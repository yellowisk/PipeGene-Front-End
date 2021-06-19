import { ProjectService } from './../../projects/project.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigProviderModalComponent } from 'src/app/components/config-provider-modal/config-provider-modal.component';
import { IProject } from 'src/app/interfaces/project.interface';
import { IProvider } from 'src/app/interfaces/provider.interface';
import { ExecutionService } from '../../executions/execution.service';
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

  constructor(
    private readonly providerService: ProviderService,
    private readonly projectService: ProjectService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.pipelineForm = this.formBuilder.group({
      executionName: [null, [Validators.required]],
      projectId: [null, [Validators.required]],
      executionSteps: this.formBuilder.array([]),
    });

    this.pipelineForm.get("projectId").valueChanges.subscribe((value) => {
      this.selectedProject = this.projects.filter(
        (project) => project.id === value
      )[0];
      this.addStep();
    });

    this.getProviders();
    this.getProjects()
  }

  getProviders(): void {
    this.providerService.listProviders().subscribe((response) => {
      this.providers = response;
    });
  }

  getProjects(): void {
    this.projectService.listProjects().subscribe((response) => {
      this.projects = response;
    })
  }

  createPipeline(): void {}

  initStepRow(inputType: string | null): FormGroup {
    return this.formBuilder.group({
      providerId: [null, [Validators.required]],
      inputType: [inputType || null],
      outputType: [null, [Validators.required]],
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

  setProvider(): void {
    this.selectedProviders.push(
      this.providers.filter(
        (p) =>
          p.id ===
          this.pipelineForm.get('executionSteps').value[this.steps.length -1]
            .providerId
      )[0]
    );
  }

  openConfigProviderModal(): void {
    this.configProviderModal.open();
  }
}
