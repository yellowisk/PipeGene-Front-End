import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule],
  providers: [],
  exports: [CardComponent]
})
export class CardModule {}
