import { ErrorService } from 'src/app/services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OperationsModalFormComponent } from './../../../../components/operations-modal-form/operations-modal-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProviderService } from '../provider.service';
import { IOperation } from 'src/app/interfaces/provider.interface';
import { ErrorMap } from 'src/app/enums/error-code.enum';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.scss'],
})
export class ProviderFormComponent implements OnInit {
  @ViewChild('operationModal')
  readonly operationModal: OperationsModalFormComponent;
  providerForm: FormGroup;
  operations: IOperation[] = [];
  editMode: string = null;

  constructor(
    private readonly providerService: ProviderService,
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
      public: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.id) {
        this.editMode = params.id;
        this.setEditMode(params.id);
      }
    });
  }

  submitProvider(): void {
    if (!this.validateForm()) { return; }
    const provider = this.providerForm;
    console.log(provider.get('public').value + " " + provider.get('inputSupportedTypes')
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
          public: provider.get('public').value
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
        public: provider.get('public').value
      };
      this.providerService.submitProviders(newProvider).subscribe(
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

  openOperationsModal(operationData: any): void {
    if (this.editMode) {
      this.operationModal.open(operationData);
      
    } else {
      this.operationModal.open(null);
    }
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

    this.providerService.getOneProvider(id)

    .subscribe(
      (providerResponse) => {
        this.providerForm.get('name').setValue(providerResponse.name);
        this.providerForm.get('description').setValue(providerResponse.description);
        this.providerForm.get('url').setValue(providerResponse.url);
        this.providerForm.get('urlSource').setValue(providerResponse.urlSource);
        this.providerForm.get('inputSupportedTypes').setValue(providerResponse.inputSupportedTypes);
        this.providerForm.get('outputSupportedTypes').setValue(providerResponse.outputSupportedTypes);
        this.providerForm.get('public').setValue(providerResponse.public);
        
        this.operations = [];

        // Add operations individually
        for (const operation of providerResponse.operations) {
          this.operations.push(operation);
        }
        console.log(JSON.stringify(providerResponse))
      }
    )
  }
}
