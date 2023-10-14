import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IParameter } from 'src/app/interfaces/provider.interface';

@Component({
  selector: 'app-provider-parameters-form',
  templateUrl: './provider-parameters-form.component.html',
  styleUrls: ['./provider-parameters-form.component.scss'],
})
export class ProviderParametersFormComponent implements OnInit {
  @Output() newParameter: EventEmitter<any> = new EventEmitter();
  @Output() hide: EventEmitter<number> = new EventEmitter();

  @Input() inputOperationData: IParameter = null;
  @Input() parameterIndex: number;

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

  ngOnInit(): void {
    if (this.inputOperationData != null) {
      const parameter = this.inputOperationData;
      this.parametersForm.get('type').setValue(parameter.type);
      this.parametersForm.get('name').setValue(parameter.name);
      this.parametersForm.get('key').setValue(parameter.key);
      this.parametersForm.get('example').setValue(parameter.example);
    }
  }

  closeForm(): void {
    // Emit the index to hide the specific form
    this.hide.emit(this.parameterIndex);
  }

  return(): void {
    if (!this.validateForm()) {
      return;
    }
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
