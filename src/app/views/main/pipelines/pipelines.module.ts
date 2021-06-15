import { EmptyStateModule } from '../../../components/empty-state/empty-state.module';
import { PipelinesRoutingModule } from './pipelines-routing.module';
import { PipelineFormComponent } from './pipeline-form/pipeline-form.component';
import { PipelinesComponent } from './pipelines.component';
import { CardModule } from '../../../components/card/card.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PipelinesComponent, PipelineFormComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    PipelinesRoutingModule,
    CardModule,
    EmptyStateModule
  ],
  providers: [],
  bootstrap: [],
})
export class PipelinesModule {}
