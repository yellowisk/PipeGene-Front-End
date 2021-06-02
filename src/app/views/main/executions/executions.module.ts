import { CardModule } from './../../../components/card/card.module';
import { ExecutionFormComponent } from './execution-form/execution-form.component';
import { ExecutionsComponent } from './executions.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExecutionsRoutingModule } from './executions-routing.module';


@NgModule({
  declarations: [
    ExecutionsComponent,
    ExecutionFormComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ExecutionsRoutingModule,
    CardModule
  ],
  providers: [],
  bootstrap: []
})
export class ExecutionsModule { }
