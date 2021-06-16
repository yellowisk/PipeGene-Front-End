import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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

  constructor(
    private readonly modalService: BsModalService,
    private readonly formBuilder: FormBuilder
  ) {
    this.operationForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  open(): void {
    this.modalRef = this.modalService.show(this.modal);
  }

  return(): void {
    if (this.operationForm.valid) {
      this.newOperation.emit(this.operationForm.value);
      this.operationForm.reset();
      this.modalRef.hide();
    } else {
      this.operationForm.markAsTouched();
    }
  }

}
