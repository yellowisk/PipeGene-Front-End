import { HttpErrorResponse } from '@angular/common/http';
import { OperationsModalFormComponent } from './../../../../components/operations-modal-form/operations-modal-form.component';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProviderService } from '../provider.service';
import { IOperation } from 'src/app/interfaces/provider.interface';

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

  constructor(
    private readonly providerService: ProviderService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {
    this.providerForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      url: [null, [Validators.required]],
      description: [null, [Validators.required]],
      inputSupportedTypes: [null, [Validators.required]],
      outputSupportedTypes: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  submitProvider(): void {
    if (!this.validateForm()) { return; }

    const newProvider = {
      name: this.providerForm.get('name').value,
      url: this.providerForm.get('url').value,
      description: this.providerForm.get('description').value,
      inputSupportedTypes: this.providerForm
        .get('inputSupportedTypes')
        .value.split(','),
      outputSupportedTypes: this.providerForm
        .get('outputSupportedTypes')
        .value.split(','),
      operations: this.operations,
    };

    this.providerService.submitProviders(newProvider).subscribe(
      () => {
        this.router.navigate(['/services']);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  openOperationsModal(): void {
    this.operationModal.open();
  }

  addOperation(event: any): void {
    console.log(event);
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
}
