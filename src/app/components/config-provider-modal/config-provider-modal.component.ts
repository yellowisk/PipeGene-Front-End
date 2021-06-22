import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IOperation } from 'src/app/interfaces/provider.interface';

@Component({
  selector: 'app-config-provider-modal',
  templateUrl: './config-provider-modal.component.html',
  styleUrls: ['./config-provider-modal.component.scss'],
})
export class ConfigProviderModalComponent implements OnInit {
  @ViewChild('modal') modal: TemplateRef<any>;
  @Output() newOperation: EventEmitter<any> = new EventEmitter();
  modalRef: BsModalRef;
  openForm = false;

  selectedOperation: any | null = null;

  filledParams: any;

  @Input() operations: IOperation[];

  constructor(private readonly modalService: BsModalService) {}
  ngOnInit(): void {}

  setOperations(operations: IOperation[]): void {
    this.modalRef = this.modalService.show(this.modal);
    this.operations = operations;
  }

  configForm(operation: string): void {
    this.selectedOperation = operation;
    this.openForm = true;
  }

  saveOperationParams(event: any): void {
    this.filledParams = event;
    this.selectedOperation = null;
    this.openForm = false;
    this.return();
  }

  return(): void {
    this.newOperation.emit(this.filledParams);
    this.modalRef.hide();
    this.selectedOperation = null;
    this.openForm = false;
  }

  closeModal(): void {
    this.modalRef.hide();
    this.selectedOperation = null;
    this.openForm = false;
  }

  closeForm(): void {
    this.selectedOperation = null;
    this.openForm = false;
  }
}
