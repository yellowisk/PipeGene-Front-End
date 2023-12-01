import { ProjectService } from './../../projects/project.service';
import { ErrorService } from 'src/app/services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OperationsModalFormComponent } from './../../../../components/operations-modal-form/operations-modal-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProviderService } from '../provider.service';
import { IOperation } from 'src/app/interfaces/provider.interface';
import { ErrorMap } from 'src/app/enums/error-code.enum';
import { CommonModule } from '@angular/common';
import { IProject } from 'src/app/interfaces/project.interface';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.scss'],
})
export class ProviderFormComponent implements OnInit {
  @ViewChild('operationModal')
  readonly operationModal: OperationsModalFormComponent;
  isPrivateSelected: boolean = false;
  projects: IProject[] = [];
  selectedProjectIds: string[] = [];
  providerForm: FormGroup;
  operations: IOperation[] = [];
  editMode: string = null;

  constructor(
    private readonly providerService: ProviderService,
    private readonly projectService: ProjectService,
    private readonly formBuilder: FormBuilder,
    private readonly errorService: ErrorService,
    private readonly router: Router,
    private route: ActivatedRoute
  ) {
    this.providerForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      url: [null, [Validators.required]],
      urlSource: [null],
      description: [null, [Validators.required]],
      inputSupportedTypes: [null, [Validators.required]],
      outputSupportedTypes: [null, [Validators.required]],
      isPublic: [null, [Validators.required]],
      selectedProjectIds: [this.selectedProjectIds]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.id) {
        this.editMode = params.id;
        this.setEditMode(params.id);
      }
    });
    this.projectService.listProjects().subscribe(
      (projectsResponse) => {
        this.projects = projectsResponse;
        console.log(this.projects)
      }
    );
  }

  get unselectedProjects(): IProject[] {
    return this.projects.filter(project => !this.selectedProjectIds.includes(project.id));
  }
  
  onSelectProject(event: any): void {
    const selectedProjectId: string = event.target.value;
    const selectedProject = this.unselectedProjects.find(project => project.id === selectedProjectId);
  
    if (selectedProject) {
      this.toggleProjectSelection(selectedProject.id);
      event.target.value = "";
    }
  }
  
  toggleProjectSelection(projectId: string) {
    const index = this.selectedProjectIds.indexOf(projectId);
    if (index !== -1) {
      this.selectedProjectIds.splice(index, 1);
    } else {
      this.selectedProjectIds.push(projectId);
    }
  
    console.log(this.selectedProjectIds);
  }

  getProjectNameById(projectId: string): string {
    const project = this.projects.find(project => project.id === projectId);
    return project ? project.name : '';
  }

  submitProvider(): void {
    if (!this.validateForm()) { return; }
    const provider = this.providerForm;
    console.log(provider.get('isPublic').value + " " + provider.get('inputSupportedTypes')
    .value)
    console.log(JSON.stringify(provider.value.operations) + " +--)" + JSON.stringify(this.operations))

    if(this.editMode) {
      this.route.queryParams.subscribe((params) => {
        const id = params.id;
        console.log(id);
        console.log("input verify: " + provider.get('inputSupportedTypes').value)

        const editedProvider = {
          name: provider.value.name,
          description: provider.value.description,
          url: provider.value.url,
          urlSource: provider.value.urlSource,
          inputSupportedTypes: typeof provider.get('inputSupportedTypes').value === 'string'
          ? provider.get('inputSupportedTypes').value.split(',').map(item => item.trim())
          : provider.get('inputSupportedTypes').value,
        
        outputSupportedTypes: typeof provider.get('outputSupportedTypes').value === 'string'
          ? provider.get('outputSupportedTypes').value.split(',').map(item => item.trim())
          : provider.get('outputSupportedTypes').value,
          operations: this.operations,
          isPublic: provider.get('isPublic').value,
          selectedProjectIds: provider.get('selectedProjectIds').value
        }

        this.providerService.editProvider(id, editedProvider).subscribe(
          () => {
            this.router.navigate(['/services']);
          },
          (error: HttpErrorResponse) => {
            this.errorService.setError(ErrorMap.get('FAILED_TO_PATCH'));
          }
        )
      });
    } else {
      const newProvider = {
        name: provider.get('name').value,
        description: provider.get('description').value,
        url: provider.get('url').value,
        urlSource: provider.get('urlSource').value,
        inputSupportedTypes: provider.get('inputSupportedTypes')
          .value.split(','),
        outputSupportedTypes: provider.get('outputSupportedTypes')
          .value.split(','),
        operations: this.operations,
        isPublic: provider.get('isPublic').value,
        selectedProjectIds: provider.get('selectedProjectIds').value
      };
      this.providerService.submitProviders(newProvider,).subscribe(
        () => {
          this.router.navigate(['/services']);
        },
        (error: HttpErrorResponse) => {
          this.errorService.setError(ErrorMap.get('FAILED_TO_POST'));
          console.log(JSON.stringify(newProvider))
        }
      );
    }
  }

  getSelectedProjectByProviderId(id: string): void {
    this.providerService.getProjectsByProvider(id).subscribe( response => {
        this.selectedProjectIds = response;
        this.providerForm.get('selectedProjectIds').setValue(response)
      }
    )

  }

  openOperationsModal(operationData: any, index: number): void {
    if (this.editMode) {
      this.operationModal.open(operationData, index);
      console.log("edit mode is: " + this.editMode)
    } else {
      this.operationModal.open(null, null);
      console.log("edit mode is: " + this.editMode)
    }
    console.log(this.providerForm.value)
  }

  addOperation(event: any): void {
    this.operations.push(event);
  }

  getControlError(control: string): boolean {
    const formControl = this.providerForm.get(control);
    return formControl.errors && formControl.touched;
  }

  validateForm(): boolean {
    if (this.providerForm.valid) {
      return true;
    }
    this.providerForm.markAllAsTouched();
    return false;
  }

  setEditMode(id: string): void {
    console.log(id);

    this.getSelectedProjectByProviderId(id);
    this.providerService.getOneProvider(id)

    .subscribe(
      (providerResponse) => {
        this.providerForm.get('name').setValue(providerResponse.name);
        this.providerForm.get('description').setValue(providerResponse.description);
        this.providerForm.get('url').setValue(providerResponse.url);
        this.providerForm.get('urlSource').setValue(providerResponse.urlSource);
        this.providerForm.get('inputSupportedTypes').setValue(providerResponse.inputSupportedTypes);
        this.providerForm.get('outputSupportedTypes').setValue(providerResponse.outputSupportedTypes);
        this.providerForm.get('isPublic').setValue(providerResponse.isPublic);
         
        this.operations = [];

        // Add operations individually
        for (const operation of providerResponse.operations) {
          this.operations.push(operation);
          console.log(JSON.stringify(operation))
        }
        console.log(JSON.stringify(providerResponse))
      }
    )
  }

  editOperation(event: any): void {
    this.operations[event.index].type = event.type;
    this.operations[event.index].description = event.description;
    this.operations[event.index].params = event.params;
  }
}
