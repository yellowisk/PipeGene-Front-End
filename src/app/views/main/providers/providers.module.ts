import { ProviderParametersFormComponent } from './../../../components/provider-parameters-form/provider-parameters-form.component';
import { EmptyStateModule } from './../../../components/empty-state/empty-state.module';
import { ProvidersComponent } from './providers.component';
import { CardModule } from '../../../components/card/card.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProvidersRoutingModule } from './providers-routing.module';
import { ProviderFormComponent } from './provider-form/provider-form.component';

@NgModule({
  declarations: [ProvidersComponent, ProviderFormComponent, ProviderParametersFormComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ProvidersRoutingModule,
    CardModule,
    EmptyStateModule
  ],
  providers: [],
  bootstrap: [],
})
export class ProvidersModule {}
