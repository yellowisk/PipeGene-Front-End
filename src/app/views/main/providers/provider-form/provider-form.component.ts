import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProviderService } from '../provider.service';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.scss']
})
export class ProviderFormComponent implements OnInit {
  providerForm: FormGroup;

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

}
