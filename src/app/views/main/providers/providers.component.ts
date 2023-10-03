import { ErrorService } from './../../../services/error.service';
import { ProviderService } from './provider.service';
import { IProvider } from 'src/app/interfaces/provider.interface';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMap } from 'src/app/enums/error-code.enum';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss'],
})
export class ProvidersComponent implements OnInit {
  providers: any[] = [];
  provider: IProvider;

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

}
