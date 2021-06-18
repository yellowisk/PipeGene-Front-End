import { ExecutionDetailsComponent } from './../../../components/execution-details/execution-details.component';
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
import { TooltipModule } from 'ng2-tooltip-directive';


@NgModule({
  declarations: [
    ExecutionsComponent,
    ExecutionFormComponent,
    ExecutionDetailsComponent,
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
    TooltipModule
  ],
  providers: [],
  bootstrap: []
})
export class ExecutionsModule { }
