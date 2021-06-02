import { CardModule } from './../../../components/card/card.module';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectFormComponent
  ],
  imports: [
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
