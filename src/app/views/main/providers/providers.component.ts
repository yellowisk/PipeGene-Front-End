import { ProviderService } from './provider.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss'],
})
export class ProvidersComponent implements OnInit {
  providers: any[] = [];

  constructor(private readonly providerService: ProviderService) {}

  ngOnInit(): void {
    this.getProviders();
  }

  getProviders(): void {
    this.providerService.listProviders().subscribe((response) => {
      this.providers = response;
    });
  }
}
