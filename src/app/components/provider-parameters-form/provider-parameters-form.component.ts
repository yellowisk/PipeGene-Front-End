import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: "app-provider-parameters-form",
  templateUrl: "./provider-parameters-form.component.html",
  styleUrls: ["./provider-parameters-form.component.scss"],
})
export class ProviderParametersFormComponent implements OnInit {
  @Output() newParameter: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  parametersForm: FormGroup;
  fieldTypes = ["text"];

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
    this.close.emit(true);
  }

  return(): void {
    if (this.parametersForm.valid) {
      this.newParameter.emit(this.parametersForm.value);
      this.parametersForm.reset();
    } else {
      this.parametersForm.markAsTouched();
    }
  }
}
