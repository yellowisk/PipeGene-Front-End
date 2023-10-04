import { HttpErrorResponse } from '@angular/common/http';
import { PipelineService } from './../pipeline.service';
import { ProjectService } from './../../projects/project.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigProviderModalComponent } from 'src/app/components/config-provider-modal/config-provider-modal.component';
import { IProject } from 'src/app/interfaces/project.interface';
import { IProvider } from 'src/app/interfaces/provider.interface';
import { ProviderService } from '../../providers/provider.service';
import { ErrorService } from 'src/app/services/error.service';
import { ErrorMap } from 'src/app/enums/error-code.enum';
import { switchMap } from 'rxjs/operators';
import { IExportPipeline } from 'src/app/interfaces/pipeline.interface';

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
  selectedProjects: IProject[] = [];
  selectedProviders: IProvider[] = [];
  steps: any[] = [];

  serviceConfigIndex: number | null;
  editMode: string = null;
  showExport: boolean = false;
  importProjectId: string = '';

  constructor(
    private readonly providerService: ProviderService,
    private readonly projectService: ProjectService,
    private readonly pipelineService: PipelineService,
    private readonly formBuilder: FormBuilder,
    private readonly errorService: ErrorService,
    private readonly router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pipelineForm = this.formBuilder.group({
      executionName: [null, [Validators.required]],
      projectId: [null, [Validators.required]],
      executionSteps: this.formBuilder.array([])
    });

    this.pipelineForm.get('projectId').valueChanges.subscribe((value) => {
      this.selectedProject = this.projects.filter(
        (project) => project.id === value
      )[0];
      const stepsArray = this.pipelineForm.controls.executionSteps as FormArray;
      if (stepsArray.length < 1) {
        this.addStep();
      }
    });

    this.getProviders();
    this.loadProjectsAndEdit();
  }

  getProviders(): void {
    this.providerService.listProviders().subscribe(
      (response) => {
        this.providers = response;
      },
      (error: HttpErrorResponse) => {
        this.errorService.setError(ErrorMap.get('FAILED_TO_GET'));
      }
    );
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

  loadProjectsAndEdit(): void {
    this.getProjects();
  
    this.route.queryParams.subscribe((params) => {
      if (params.id) {
        this.editMode = params.id;
        this.setEditMode(params.id);
      }
    });
  }

  initStepRow(inputType: string | null): FormGroup {
    return this.formBuilder.group({
      stepId: [null, [Validators.required]],
      providerId: [null, [Validators.required]],
      inputType: [inputType || ''],
      outputType: [null, [Validators.required]],
      params: [null],
      stepNumber: [null]
    });
  }

  addStep(): void {
    this.steps.push(this.steps.length + 1);
    const stepsArray = this.pipelineForm.controls.executionSteps as FormArray;
    const stepNumber = stepsArray.length + 1;
    this.steps.push(stepNumber);
    stepsArray.push(this.initStepRow(this.getFileType()));
  }

  removeStep(index: number): void {
    const stepsArray = this.pipelineForm.controls.executionSteps as FormArray;
    if (stepsArray.length <= 1) {
      return;
    }
    this.steps.splice(this.steps.length - 1, 1);
    this.selectedProviders.splice(this.providers.length - 1, 1);
    stepsArray.removeAt(index);
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
    const executionStepsArray = this.pipelineForm.get('executionSteps') as FormArray;
    const stepFormGroup = executionStepsArray.at(index) as FormGroup;
    const providerId = stepFormGroup.get('providerId')?.value;
    if(providerId) {
      this.selectedProviders[index] = this.providers.filter(
        (p) =>
          p.id ===
          providerId
      )[0];
    }
      /* or this:
      if (providerId) {
        this.selectedProviders[index] = this.providers.find(p => p.id === providerId);
      } */
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
    if (controlArray.controls[this.serviceConfigIndex]) {
      controlArray.controls[this.serviceConfigIndex]
        .get('params')
        .setValue(event);
    }
    this.serviceConfigIndex = null;
  
  }

  serviceIsConfigured(index: number): boolean {
    const controlArray = this.pipelineForm.get('executionSteps') as FormArray;
    return controlArray.controls[index]?.get('params').value;
  }

  createPipeline(): void {
    if (!this.validateForm()) {
      return;
    }

    const pipeline = this.pipelineForm.value;
    if (this.editMode) {
      this.route.queryParams.subscribe((params) => {
        const id = params.id;

        pipeline.executionSteps = this.pipelineForm.get('executionSteps').value;
        
        console.log("--- " + JSON.stringify(pipeline.executionSteps))

        this.pipelineService.editPipeline(pipeline.projectId, id, {
          description: pipeline.executionName,
          steps: pipeline.executionSteps
        }).subscribe(
          () => {
            this.router.navigate(['/pipelines']);
          },
          (error: HttpErrorResponse) => {
            this.errorService.setError(ErrorMap.get('FAILED_TO_PATCH'));
          }
        )
      });
      
      
    } else {
      this.pipelineService
      .createPipeline(
        {
          description: pipeline.executionName,
          steps: pipeline.executionSteps,
        },
        pipeline.projectId
      )
      .subscribe(
        () => this.router.navigate(['/pipelines']),
        (error: HttpErrorResponse) => {
          this.errorService.setError(ErrorMap.get('FAILED_TO_POST'));
        }
      );
    }
  }

  exportPipeline() {
    let projectId = '';
    let importProjectId = this.importProjectId;
    console.log("----"+ importProjectId)
  
    this.route.queryParams.subscribe((params) => {
      if (params.id) {
        this.projectService.getOneProjectByPipeline(params.id).pipe(
          switchMap((projectResponse) => {
            projectId = projectResponse.id;
            this.pipelineForm.get('projectId').setValue(projectResponse.id);
  
            return this.pipelineService.getOnePipeline(projectId, params.id);
          })
        ).subscribe(
          (pipelineResponse) => {
            const importPayload: IExportPipeline = {
              projectId: importProjectId, // Set the projectId property here
            };

            console.log("projId of the pipe: " + projectId);
            console.log("proj of the pipe formatted: " + importPayload.projectId)
            console.log("proj of the select: " + importProjectId);

            this.pipelineService.exportPipeline(projectId, params.id, importPayload).subscribe((exportResponse) => {
              console.log(JSON.stringify(exportResponse))
            })
            this.router.navigate(['/pipelines'])
            },
          (error: HttpErrorResponse) => {
            this.errorService.setError(ErrorMap.get('FAILED_TO_GET'));
          }
        );
      }
    });
  }
  

  showExportBox() {
    this.showExport = true;
    this.importProjectId = '';
    for (const project of this.projects) {
      console.log(project.id + " " + project.name)
    }
  }

  cancelExport() {
    this.showExport = false;
    this.importProjectId = '';
  }

  setEditMode(id: string): void {
    console.log("pipeId: " + id)
  
    this.projectService.getOneProjectByPipeline(id).pipe(
      switchMap((projectResponse) => {
        const projectId = projectResponse.id;
        this.pipelineForm.get('projectId').setValue(projectResponse.id);
        console.log("projectId: " + projectId)
  
        return this.pipelineService.getOnePipeline(projectId, id);
      })
    ).subscribe(
      (pipelineResponse) => {
        this.pipelineForm.get('executionName').setValue(pipelineResponse.description);
        
        const executionStepsArray = this.pipelineForm.get('executionSteps') as FormArray;
        executionStepsArray.clear();

        // Adding steps from pipelineResponse to FormArray
        pipelineResponse.steps.forEach((step, index) => {
          const stepFormGroup = this.initStepRow(step.inputType);
          stepFormGroup.patchValue({ ...step, stepNumber: index + 1 });
          if (this.providers) {
            this.selectedProviders.push(this.providers.find(provider => provider.id === step.providerId));
          }

          executionStepsArray.push(stepFormGroup);
        });

      pipelineResponse.steps.forEach((step) => {
        this.saveServiceConfigs(step.params);
      });
      },
      (error: HttpErrorResponse) => {
        this.errorService.setError(ErrorMap.get('FAILED_TO_GET'));
      }
    );
  }

  getControlError(control: string): boolean {
    const formControl = this.pipelineForm.get(control);
    return formControl.errors && formControl.touched;
  }

  validateForm(): boolean {
    const stepsArray = this.pipelineForm.controls.executionSteps as FormArray;
    if (this.pipelineForm.valid && stepsArray.valid) {
      return true;
    }
    this.pipelineForm.markAllAsTouched();
    stepsArray.markAllAsTouched();
    return false;
  }

}