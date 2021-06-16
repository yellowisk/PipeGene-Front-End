import { AfterContentChecked, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.scss'],
})
export class InputValidationComponent implements AfterContentChecked {
  message: string;
  @Input() control: FormControl = null;
  @Input() form: FormGroup = null;

  errorsMap: Map<string, string> = new Map([
    ['required', 'Campo obrigatório'],
    ['email', 'Email inválido'],
    ['notSame', 'Senhas não conferem'],
  ]);

  constructor() {}

  ngAfterContentChecked(): void {
    if (
      this.form &&
      this.form.status === 'INVALID' &&
      this.form.errors &&
      this.control.touched
    ) {
      this.message = this.errorsMap.get(Object.keys(this.control.errors)[0]);
    } else if (this.control.status === 'INVALID' && this.control.touched) {
      this.message = this.errorsMap.get(Object.keys(this.control.errors)[0]);
    } else {
      this.message = '';
    }
  }
}
