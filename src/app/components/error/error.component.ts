import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ErrorService } from '../../services/error.service';
import { ModalError } from '../../interfaces/error.interface';

import { ConnectionService } from 'ng-connection-service';
import { ErrorMap } from '../../enums/error-code.enum';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})

export class ErrorComponent implements OnInit {
  @ViewChild('modal') modal: TemplateRef<any>;
  modalRef: BsModalRef;

  modalInfo: ModalError = {
    title: '',
    icon: '',
    description: ''
  };


  constructor(
    private errorContent: ErrorService,
    private connectionService: ConnectionService,
    private readonly modalService: BsModalService
  ) {
  }

  ngOnInit(): void {
    this.errorContent.errorEmmiter.subscribe((modalInfo) => {
      this.modalInfo = modalInfo;
      this.openModal();
    });

    this.connectionService.monitor().subscribe(isConnected => {
      if (!isConnected) {
        this.modalInfo = ErrorMap.get('NOT_CONNECTED');
        this.openModal();
      }
    });

  }

  openModal(): void {
    this.modalRef = this.modalService.show(this.modal);
  }

}
