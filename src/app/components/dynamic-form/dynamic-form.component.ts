import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Output() saveInput: EventEmitter<any> = new EventEmitter();
  @Output() closeForm: EventEmitter<boolean> = new EventEmitter();

  @Input() params: any;
  @Input() description: string;
  ready = false;
  paramsForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.generateForm();
  }

  getControlError(control: string): boolean {
    const formControl = this.paramsForm.get(control);
    return formControl.errors && formControl.touched;
  }

  generateForm(): void {
    if (this.params?.length > 0) {
      const group: any = {};

      this.params.forEach((param) => {
        group[param.key] = new FormControl(null, Validators.required);
      });

      this.paramsForm = new FormGroup(group);
      this.ready = true;
    }
  }

  save(): void {
    if (!this.validateForm()) { return; }
    this.saveInput.emit(this.paramsForm.value);
  }

  close(): void {
    this.closeForm.emit(true);
  }

  validateForm(): boolean {
    if (this.paramsForm.valid) {
      return true;
    }
    this.paramsForm.markAllAsTouched();
    return false;
  }
}
