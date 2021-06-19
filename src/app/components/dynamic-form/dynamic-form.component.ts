import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() params: any;
  @Input() description: string;
  ready = false;
  paramsForm: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.params[0].name = "teste"
    this.generateForm();
  }

  getControlError(control: any): boolean {
    const formControl = this.paramsForm.get(control);
    console.log(this.paramsForm.get(control).value);
    return  formControl.touched;
  }

  generateForm(): void {
    if (this.params?.length > 0) {
      const group: any = {};

      this.params.forEach(param => {
        group[param.key] = new FormControl(null, Validators.required);
      });


      this.paramsForm = new FormGroup(group);
      console.log(this.paramsForm)
      this.ready = true;
    }
  }
}
