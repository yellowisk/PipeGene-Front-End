import { ProviderParametersFormComponent } from './../../../../components/provider-parameters-form/provider-parameters-form.component';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProviderService } from '../provider.service';
import { IParameter } from 'src/app/interfaces/parameter.interface';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.scss']
})
export class ProviderFormComponent implements OnInit {
  @ViewChild('parametersModal') readonly parametersModal: ProviderParametersFormComponent;
  providerForm: FormGroup;
  parameters: IParameter[] = [];

  constructor(
    private readonly providerService: ProviderService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) {
    this.providerForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      url: [null, [Validators.required]],
      description: [null, [Validators.required]],
      inputSupportedTypes: [null, [Validators.required]],
      outputSupportedTypes: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {

  }

  submitProvider(): void {
    this.providerService.submitProviders(this.providerForm.value).subscribe(response => {
      console.log(response);
      this.router.navigate(['/services']);
    });
  }

  openParametersModal() {
    this.parametersModal.open();
  }

  addParameter(event: any): void {
    this.parameters.push(event)
  }

}
