import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IParameter } from 'src/app/interfaces/provider.interface';
import { ProviderParametersFormComponent } from '../provider-parameters-form/provider-parameters-form.component';

@Component({
  selector: 'app-operations-modal-form',
  templateUrl: './operations-modal-form.component.html',
  styleUrls: ['./operations-modal-form.component.scss'],
})
export class OperationsModalFormComponent implements OnInit {
  @ViewChild('modal') modal: TemplateRef<any>;
  @Output() newOperation: EventEmitter<any> = new EventEmitter();
  @Output() updatedOperation: EventEmitter<any> = new EventEmitter();
  modalRef: BsModalRef;
  operationForm: FormGroup;
  showParameterForm = false;

  editOperationMode = false;
  parameters: IParameter[] = [];
  editMode: boolean = false;
  descriptionText: string = '';
  typeText: string = '';
  parameterIndex: number;
  
  parametersForm: ProviderParametersFormComponent;
  parameterFormVisibility: boolean[] = [];

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

  addParameter(event: any): void {
    this.parameters.push(event);
    this.showParameterForm = false;
    console.log("nothing to edit.");
  }

  updateParameter(event: {parameter: IParameter, index: number}): void {

    const {parameter, index} = event

    this.parameters[index].example = parameter.example
    this.parameters[index].key = parameter.key
    this.parameters[index].name = parameter.name
    this.parameters[index].type = parameter.type

    console.log('Received parameter: ' + JSON.stringify(parameter));
    console.log('Received index: ' + index);
  }

  showItem(index: number): void {
    if (this.parameterFormVisibility[index] === true) {
      return;
    }

    for (let paramIndex = 0; paramIndex < this.parameters.length; paramIndex++) {
      if (paramIndex !== index) {
        this.hideItem(paramIndex);
      }
    }

    this.parameterFormVisibility[index] = true;
  }

  hideItem(index: number): void {
    this.parameterFormVisibility[index] = false;
  }
  
  open(operationData: any, index: number): void {
    if (operationData == null) {
      this.editOperationMode = false;

      this.descriptionText = 'Description'

      this.operationForm.setValue({
        type: null,
        description: null,
      });
      this.parameters = [];
    } else if (operationData) {
      this.editOperationMode = true;
      this.setEditMode()

      this.descriptionText = operationData.description;
      this.typeText = operationData.type;
      this.parameterIndex = index;

      this.operationForm.setValue({
        type: this.typeText || null,
        description: this.descriptionText || null,
      });
      this.parameters = operationData.params || [];
    }
  
    this.modalRef = this.modalService.show(this.modal);
  }

  return(): void {
    if (!this.validateForm()) { return; }

    if (this.editOperationMode) {
      const operation = {
        index: this.parameterIndex,
        type: this.operationForm.get('type').value,
        description: this.operationForm.get('description').value,
        params: this.parameters
      }
      this.updatedOperation.emit(operation);
    } else {
      const operation = {
        type: this.operationForm.get('type').value,
        description: this.operationForm.get('description').value,
        params: this.parameters
      }
      this.newOperation.emit(operation);
    }
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

  setEditMode() : void {
    this.editMode = true;
  }

}
