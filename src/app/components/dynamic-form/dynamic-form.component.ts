import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() operation: any;
  ready = false;
  paramsForm: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.generateForm();
  }

  getControlError(control: any): boolean {
    const formControl = this.paramsForm.get(control);
    return formControl.errors && formControl.touched;
  }

  generateForm(): void {
    if (this.operation?.params.length > 0) {
      const group: any = {};

      this.operation.params.forEach(param => {
        group[param.key] = new FormControl(null, Validators.required);
      });


      this.paramsForm = new FormGroup(group);
      this.ready = true;
    }
  }
}
