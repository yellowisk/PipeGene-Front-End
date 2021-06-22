import { InputValidationModule } from './../../../components/input-validation/input-validation.module';
import { EmptyStateModule } from '../../../components/empty-state/empty-state.module';
import { CardModule } from './../../../components/card/card.module';
import { ExecutionFormComponent } from './execution-form/execution-form.component';
import { ExecutionsComponent } from './executions.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExecutionsRoutingModule } from './executions-routing.module';
import { ExecutionDetailsModule } from 'src/app/components/execution-details/execution-details.module';


@NgModule({
  declarations: [
    ExecutionsComponent,
    ExecutionFormComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ExecutionsRoutingModule,
    CardModule,
    EmptyStateModule,
    InputValidationModule,
    ExecutionDetailsModule
  ],
  providers: [],
  bootstrap: []
})
export class ExecutionsModule { }
