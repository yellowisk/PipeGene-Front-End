import { DynamicFormComponent } from './../dynamic-form/dynamic-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigProviderModalComponent } from './config-provider-modal.component';

@NgModule({
  declarations: [ConfigProviderModalComponent, DynamicFormComponent],
  imports: [CommonModule],
  providers: [],
  bootstrap: [],
  exports: [ConfigProviderModalComponent],
})
export class ConfigProviderModalModule {}
