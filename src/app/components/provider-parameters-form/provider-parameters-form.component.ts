import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-provider-parameters-form',
  templateUrl: './provider-parameters-form.component.html',
  styleUrls: ['./provider-parameters-form.component.scss'],
})
export class ProviderParametersFormComponent implements OnInit {
  @Output() newParameter: EventEmitter<any> = new EventEmitter();
  @Output() hide: EventEmitter<boolean> = new EventEmitter();
  parametersForm: FormGroup;
  fieldTypes = ['text'];

  constructor(private readonly formBuilder: FormBuilder) {
    this.parametersForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      example: [null, [Validators.required]],
      type: [null, [Validators.required]],
      key: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  closeForm(): void {
    this.hide.emit(true);
  }

  return(): void {
    if (!this.validateForm()) { return; }
    this.newParameter.emit(this.parametersForm.value);
    this.parametersForm.reset();
  }

  getControlError(control: string): boolean {
    const formControl = this.parametersForm.get(control);
    return formControl.errors && formControl.touched;
  }

  validateForm(): boolean {
    if (this.parametersForm.valid) {
      return true;
    }
    this.parametersForm.markAllAsTouched();
    return false;
  }
}
