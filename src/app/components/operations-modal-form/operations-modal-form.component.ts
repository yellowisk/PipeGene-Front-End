import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IParameter } from 'src/app/interfaces/provider.interface';

@Component({
  selector: 'app-operations-modal-form',
  templateUrl: './operations-modal-form.component.html',
  styleUrls: ['./operations-modal-form.component.scss'],
})
export class OperationsModalFormComponent implements OnInit {
  @ViewChild('modal') modal: TemplateRef<any>;
  @Output() newOperation: EventEmitter<any> = new EventEmitter();
  modalRef: BsModalRef;
  operationForm: FormGroup;
  showParameterForm = false;
  parameters: IParameter[] = [];

  constructor(
    private readonly modalService: BsModalService,
    private readonly formBuilder: FormBuilder
  ) {
    this.operationForm = this.formBuilder.group({
      type: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  addParameter(event: IParameter): void {
    this.parameters.push(event);
    this.showParameterForm = false;
  }

  open(): void {
    this.modalRef = this.modalService.show(this.modal);
  }

  return(): void {
    if (!this.validateForm()) { return; }
    const operation = {
      type: this.operationForm.get('type').value,
      description: this.operationForm.get('description').value,
      params: this.parameters,
    };
    this.newOperation.emit(operation);
    this.operationForm.reset();
    this.modalRef.hide();
  }

  getControlError(control: string): boolean {
    const formControl = this.operationForm.get(control);
    return formControl.errors && formControl.touched;
  }

  validateForm(): boolean {
    if (this.operationForm.valid) {
      return true;
    }
    this.operationForm.markAllAsTouched();
    return false;
  }
}
