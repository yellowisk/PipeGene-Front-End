import { IProvider } from "./../../../../interfaces/provider.interface";
import { IProject } from "./../../../../interfaces/project.interface";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ProjectService } from "../../projects/project.service";
import { ProviderService } from "../../providers/provider.service";

@Component({
  selector: "app-execution-form",
  templateUrl: "./execution-form.component.html",
  styleUrls: ["./execution-form.component.scss"],
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
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.executionForm = this.formBuilder.group({
      executionName: [null, [Validators.required]],
      project: [null, [Validators.required]],
      dataset: [null, [Validators.required]],
      steps: this.formBuilder.array([
        this.formBuilder.group({
          provider: [null, [Validators.required]],
          outputFormat: [null, [Validators.required]],
        }),
      ]),
    });

    this.executionForm.get("project").valueChanges.subscribe((value) => {
      this.selectedProject = this.projects.filter(
        (project) => project.id === value
      )[0];
    });

    this.getProjects();
    this.getProviders();
  }

  getProjects() {
    this.projectService.listProjects().subscribe((response) => {
      this.projects = response;
    });
  }

  getProviders() {
    this.providerService.listProviders().subscribe((response) => {
      this.providers = response;
    });
  }

  createExecution(): any {
    console.log(this.executionForm.value);
  }

  initStepRow(): FormGroup {
    return this.formBuilder.group({
      provider: [null, [Validators.required]],
      outputFormat: [null, [Validators.required]],
    });
  }

  addStep(): void {
    this.steps.push(this.steps.length + 1);
    const stepsArray = <FormArray>this.executionForm.controls["steps"];
    stepsArray.push(this.initStepRow());
  }

  getProvider() {
    return this.providers.filter(p => (
      p.id === this.executionForm.get('steps').value[this.steps.length].provider 
    ))
  }

  setProvider() {
    this.selectedProviders.push(this.providers.filter(p => (
      p.id === this.executionForm.get('steps').value[this.steps.length].provider 
    ))[0]);
  }
}
