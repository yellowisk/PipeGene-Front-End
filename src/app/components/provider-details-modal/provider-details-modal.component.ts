import { ProviderService } from './../../views/main/providers/provider.service';
import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IProvider } from 'src/app/interfaces/provider.interface';

@Component({
  selector: 'app-provider-details-modal',
  templateUrl: './provider-details-modal.component.html',
  styleUrls: ['./provider-details-modal.component.scss']
})
export class ProviderDetailsModalComponent implements OnInit {
  @Output() detailsChanged: EventEmitter<IProvider> = new EventEmitter<IProvider>();
  @ViewChild('modal') modal: TemplateRef<any>;
  modalRef: BsModalRef;
  isOwner: boolean;

  provider: IProvider;

  constructor(
    private readonly modalService: BsModalService,
    private readonly providerService: ProviderService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  setDetails(data: IProvider): void {
    this.provider = data;
    this.modalRef = this.modalService.show(this.modal);
    this.checkProjectOwnership(this.provider.id);
  }

  setEditMode(): void {
    this.modalRef.hide();
    this.router.navigate(['/services/edit/'], {
      queryParams: { id: this.provider.id },
    });
  }

  checkProjectOwnership(providerId: string): void {
    this.providerService.isOwner(providerId).subscribe((isOwner) => {
      this.isOwner = isOwner;
    });
  }

}
