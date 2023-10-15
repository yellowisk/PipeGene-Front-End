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
  @Output() updatedParameter: EventEmitter<any> = new EventEmitter();

  @Input() inputOperationData: IParameter | null = null;
  @Input() parameterIndex: number;

  parametersForm: FormGroup;
  fieldTypes = ['text'];
  formInEditMode: boolean = false;
  parameterSent: IParameter;

  constructor(private readonly formBuilder: FormBuilder) {
    this.parametersForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      example: [null, [Validators.required]],
      type: [null, [Validators.required]],
      key: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.inputOperationData) {
      const parameter = this.inputOperationData;

      this.parametersForm.get('type').setValue(parameter.type);
      this.parametersForm.get('name').setValue(parameter.name);
      this.parametersForm.get('key').setValue(parameter.key);
      this.parametersForm.get('example').setValue(parameter.example);

      this.formInEditMode = true;

    }

  }

  closeForm(): void {
    this.hide.emit(this.parameterIndex);
  }

  return(): void {
    if (!this.validateForm()) {
      return;
    }
    
    this.newParameter.emit(this.parametersForm.value);
    this.hide.emit(this.parameterIndex)
    this.parametersForm.reset();
  }

  saveChanges(): void {
    this.parameterSent = { 
      name: null, example: null, 
      type: null, key: null
    };

    this.parameterSent.name = this.parametersForm.get('name').value
    this.parameterSent.example = this.parametersForm.get('example').value
    this.parameterSent.type = this.parametersForm.get('type').value
    this.parameterSent.key = this.parametersForm.get('key').value

    console.log(this.parameterSent)
    console.log(this.parameterIndex)

    this.updatedParameter.emit({parameter: this.parameterSent, index: this.parameterIndex});
    this.hide.emit(this.parameterIndex)
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
