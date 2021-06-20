import { InputValidationModule } from './../../../components/input-validation/input-validation.module';
import { DynamicFormComponent } from './../../../components/dynamic-form/dynamic-form.component';
import { EmptyStateModule } from '../../../components/empty-state/empty-state.module';
import { PipelinesRoutingModule } from './pipelines-routing.module';
import { PipelineFormComponent } from './pipeline-form/pipeline-form.component';
import { PipelinesComponent } from './pipelines.component';
import { CardModule } from '../../../components/card/card.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigProviderModalModule } from 'src/app/components/config-provider-modal/config-provider-modal.module';

@NgModule({
  declarations: [PipelinesComponent, PipelineFormComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    PipelinesRoutingModule,
    CardModule,
    EmptyStateModule,
    ConfigProviderModalModule,
  ],
  providers: [],
  bootstrap: [],
})
export class PipelinesModule {}
