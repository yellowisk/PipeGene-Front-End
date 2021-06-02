import { DashboardComponent } from './dashboard/dashboard.component';
import { CardModule } from './../../components/card/card.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { MainComponent } from './main.component';
import { TopBarComponent } from 'src/app/components/top-bar/top-bar.component';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';


@NgModule({
  declarations: [
    MainComponent,
    TopBarComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    RouterModule,
    CardModule
  ],
  providers: [],
  bootstrap: []
})
export class MainModule { }
