import { DashboardComponent } from './dashboard/dashboard.component';
import { ExecutionsComponent } from './executions/executions.component';
import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectFormComponent } from './projects/project-form/project-form.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'projects',
        loadChildren: () =>
        import('./projects/projects.module').then(
          (m) => m.ProjectsModule
        ),
      },
      {
        path: 'executions',
        loadChildren: () =>
        import('./executions/executions.module').then(
          (m) => m.ExecutionsModule
        ),
      },
      {
        path: 'services',
        loadChildren: () =>
        import('./providers/providers.module').then(
          (m) => m.ProvidersModule
        ),
      },
      {
        path: 'pipelines',
        loadChildren: () =>
        import('./pipelines/pipelines.module').then(
          (m) => m.PipelinesModule
        ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
