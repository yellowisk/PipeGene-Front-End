import { PipelineFormComponent } from './pipeline-form/pipeline-form.component';
import { PipelinesComponent } from './pipelines.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PipelinesComponent,
  },
  {
    path: 'new',
    component: PipelineFormComponent
  },
  {
    path: 'edit',
    component: PipelineFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PipelinesRoutingModule {}
