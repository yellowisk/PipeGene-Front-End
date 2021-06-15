import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
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
  executionForm: FormGroup;
  selectedProject: IProject;
  selectedProviders: IProvider[] = [];
  providers: IProvider[];
  projects: IProject[];
  steps: any[] = [];

  constructor(
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
      executionSteps: this.formBuilder.array([
        {
          providerId: [null, [Validators.required]],
          inputType: [null],
          outputType: [null, [Validators.required]],
        },
      ]),
    });

    this.getProviders();
  }

  getProviders(): void {
    this.providerService.listProviders().subscribe((response) => {
      this.providers = response;
    });
  }

  createPipeline(): void {

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
    }
    // else {
    //   let file;
    //   const fileId = this.executionForm.get("dataset").value;

    //   this.projects.forEach((p) => {
    //     p.datasets.forEach((d) => {
    //       if (d.id === fileId) {
    //         file = d.filename;
    //       }
    //     });
    //   });
    //   return file.substring(file.lastIndexOf(".") + 1, file.length) || file;
    // }
  }

  setProvider(): void {
    this.selectedProviders.push(
      this.providers.filter(
        (p) =>
          p.id ===
          this.executionForm.get('executionSteps').value[this.steps.length - 1]
            .providerId
      )[0]
    );
  }
}
