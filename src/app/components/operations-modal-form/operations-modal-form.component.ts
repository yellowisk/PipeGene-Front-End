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
import { ProviderParametersFormComponent } from '../provider-parameters-form/provider-parameters-form.component';

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

  showEditParameterForm = false;
  parameters: IParameter[] = [];
  editMode: boolean = false;
  descriptionText: string = '';
  typeText: string = '';
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

  addParameter(event: IParameter): void {
    this.parameters.push(event);
    this.showParameterForm = false;
  }

  showItem(index: number): void {
    this.parameterFormVisibility[index] = true;
    this.showEditParameterForm = true;
  }

  hideItem(index: number): void {
    this.parameterFormVisibility[index] = false;
  }
  
  open(operationData: any): void {
    if (operationData == null) {
      this.descriptionText = 'Description'
/*     } else if (operationData && !this.editMode) { */
    } else if (operationData) {
      this.setEditMode()
      this.descriptionText = operationData.description;
      this.typeText = operationData.type;

      this.operationForm.setValue({
        type: this.typeText || null,
        description: this.descriptionText || null,
      });
      
      this.parameters = operationData.params || [];
    }
  
    this.modalRef = this.modalService.show(this.modal);
  }

/*   editOperation(): void {
    if (!this.validateForm()) { return; }
    this.descriptionText = this.operationForm.get('description').value;
    this.typeText = this.operationForm.get('type').value;
    this.operationForm.reset();
    this.modalRef.hide();
  } */

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

  setEditMode() : void {
    this.editMode = true;
  }

}
