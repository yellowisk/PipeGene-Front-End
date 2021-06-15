import { EmptyStateComponent } from './empty-state.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    EmptyStateComponent
  ],
  imports: [
    CommonModule,
  ],
  providers: [],
  bootstrap: [],
  exports: [EmptyStateComponent]
})
export class EmptyStateModule { }
