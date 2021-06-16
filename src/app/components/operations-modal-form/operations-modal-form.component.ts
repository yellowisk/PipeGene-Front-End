import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IParameter } from 'src/app/interfaces/provider.interface';

@Component({
  selector: 'app-operations-modal-form',
  templateUrl: './operations-modal-form.component.html',
  styleUrls: ['./operations-modal-form.component.scss']
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

  ngOnInit(): void {
  }

  addParameter(event: IParameter) {
    this.parameters.push(event);
    this.showParameterForm = false;
  }

  open(): void {
    this.modalRef = this.modalService.show(this.modal);
  }

  return(): void {
    if (this.operationForm.valid) {
      const operation = {
        name: this.operationForm.get('name').value,
        description: this.operationForm.get('description').value,
        parameters: this.parameters
      }
      this.newOperation.emit(operation);
      this.operationForm.reset();
      this.modalRef.hide();
    } else {
      this.operationForm.markAsTouched();
    }
  }

}
