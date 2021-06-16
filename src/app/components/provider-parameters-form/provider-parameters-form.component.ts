import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { FormBuilder, Validators, FormArray, FormGroup } from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-provider-parameters-form",
  templateUrl: "./provider-parameters-form.component.html",
  styleUrls: ["./provider-parameters-form.component.scss"],
})
export class ProviderParametersFormComponent implements OnInit {
  @ViewChild("modal") modal: TemplateRef<any>;
  @Output() newParameter: EventEmitter<any> = new EventEmitter();

  modalRef: BsModalRef;
  parametersForm: FormGroup;
  fieldTypes = ["text"];

  constructor(
    private readonly modalService: BsModalService,
    private readonly formBuilder: FormBuilder
  ) {
    this.parametersForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      example: [null, [Validators.required]],
      type: [null, [Validators.required]],
      key: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  open() {
    this.modalRef = this.modalService.show(this.modal);
  }

  return() {
    if (this.parametersForm.valid) {
      this.newParameter.emit(this.parametersForm.value);
      this.parametersForm.reset();
      this.modalRef.hide();
    } else {
      this.parametersForm.markAsTouched();
    }
  }
}
