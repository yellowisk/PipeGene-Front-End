import { DashboardComponent } from './dashboard/dashboard.component';
import { CardModule } from './../../components/card/card.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { MainComponent } from './main.component';
import { TopBarComponent } from 'src/app/components/top-bar/top-bar.component';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { PipelinesComponent } from './pipelines/pipelines.component';
import { PipelineFormComponent } from './pipelines/pipeline-form/pipeline-form.component';
import { ExecutionDetailsModule } from 'src/app/components/execution-details/execution-details.module';


@NgModule({
  declarations: [
    MainComponent,
    TopBarComponent,
    DashboardComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    RouterModule,
    CardModule,
    ExecutionDetailsModule
  ],
  providers: [],
  bootstrap: []
})
export class MainModule { }
