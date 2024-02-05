import { ErrorService } from './../../../services/error.service';
import { ProviderService } from './provider.service';
import { IProvider } from 'src/app/interfaces/provider.interface';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMap } from 'src/app/enums/error-code.enum';
import { ProviderDetailsModalComponent } from 'src/app/components/provider-details-modal/provider-details-modal.component';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss'],
})
export class ProvidersComponent implements OnInit {
  providers: any[] = [];
  provider: IProvider;

  @ViewChild('detailsModal')
  readonly detailsModal: ProviderDetailsModalComponent;

  constructor(
    private readonly providerService: ProviderService,
    private readonly errorService: ErrorService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getProviders();
  }

  getProviders(): void {
    this.providerService.listProviders().subscribe(
      (response) => {
        this.providers = response;
      },
      (error: HttpErrorResponse) => {
        this.errorService.setError(ErrorMap.get('FAILED_TO_GET'));
      }
    );
  }

  setEditMode(provider): void {
    this.router.navigate(['/services/edit/'], {
      queryParams: { id: provider.id },
    });
  }

  isOwner(providerId: string): boolean {
    this.providerService.isOwner(providerId).subscribe(
      (response) => {
        return response;
      },
      (error: HttpErrorResponse) => {
        this.errorService.setError(ErrorMap.get('FAILED_TO_GET'));
      }
    );
    return false;
  }

  showProviderDetails(provider: IProvider): void {
    this.detailsModal.setDetails(provider);
  }

}
