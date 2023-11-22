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
  @Input() paramKey: any = null;
  ready = false;
  paramsForm: FormGroup;
  editMode: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.generateForm();
    if (this.paramKey) {
      this.editMode = true;
      this.paramKey.columns = this.formatJSONKeys(this.paramKey.columns);
      this.paramsForm.get(this.params[0].key).setValue(this.paramKey.columns)
    }
  }

  formatJSONKeys(keys: string): string {
        return keys.split(', ').join(', ');
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
    if (this.editMode) {
      this.editMode = false;
    }
  }

  close(): void {
    if (this.editMode) {
      this.editMode = false;
    }
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
