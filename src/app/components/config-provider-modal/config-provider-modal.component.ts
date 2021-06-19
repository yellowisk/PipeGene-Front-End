import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-config-provider-modal",
  templateUrl: "./config-provider-modal.component.html",
  styleUrls: ["./config-provider-modal.component.scss"],
})
export class ConfigProviderModalComponent implements OnInit {
  @ViewChild("modal") modal: TemplateRef<any>;
  @Output() newOperation: EventEmitter<any> = new EventEmitter();
  modalRef: BsModalRef;
  openForm = false;
  selectedOperation: any | null = null;

  configuredOperations: any[] = [];
  paramsInput: any[] = [];

  @Input() operations: any[];

  constructor(private readonly modalService: BsModalService) {}
  ngOnInit(): void {
    this.operations = [
      {
        type: "column",
        description: "operation description",
        params: [
          {
            type: "text",
            name: "teste",
            key: "columns",
            example: "Hugo_Symbol, Chromosome",
          },
        ],
      },
    ];
  }

  open(): void {
    this.modalRef = this.modalService.show(this.modal);
  }

  configForm(operation: string): void {
    console.log(operation);
    this.selectedOperation = operation;
    this.openForm = true;
  }

  saveOperationParams(event: any): void {
    this.paramsInput.push(event);
    this.configuredOperations.push(this.selectedOperation.type);
    this.closeForm(null);
  }

  closeForm(event: any) {
    this.openForm = false;
    this.selectedOperation = null;
  }
}
