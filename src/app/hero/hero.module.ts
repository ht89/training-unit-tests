import { NgModule } from '@angular/core';

import { HeroComponent } from './hero.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroRoutingModule } from './hero-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, HeroRoutingModule],
  exports: [],
  declarations: [HeroComponent],
  providers: [],
})
export class HeroModule {}
