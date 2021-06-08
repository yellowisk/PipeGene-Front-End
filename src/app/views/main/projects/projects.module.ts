import { ProjectDetailsModalComponent } from './../../../components/project-details-modal/project-details-modal.component';
import { CardModule } from './../../../components/card/card.module';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectFormComponent,
    ProjectDetailsModalComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ProjectsRoutingModule,
    CardModule
  ],
  providers: [],
  bootstrap: []
})
export class ProjectsModule { }
