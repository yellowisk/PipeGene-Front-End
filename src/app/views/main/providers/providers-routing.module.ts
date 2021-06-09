import { ProviderFormComponent } from './provider-form/provider-form.component';
import { ProvidersComponent } from './providers.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProvidersComponent,
  },
  {
    path: 'new',
    component: ProviderFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProvidersRoutingModule {}
