import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesComponent } from './heroes.component';

@NgModule({
  imports: [CommonModule, FormsModule, HeroesRoutingModule],
  exports: [],
  declarations: [HeroDetailComponent, HeroesComponent],
  providers: [],
})
export class HeroModule {}
