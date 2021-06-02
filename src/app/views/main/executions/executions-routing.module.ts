import { ExecutionFormComponent } from './execution-form/execution-form.component';
import { ExecutionsComponent } from './executions.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ExecutionsComponent,
  },
  {
    path: 'new',
    component: ExecutionFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExecutionsRoutingModule {}
