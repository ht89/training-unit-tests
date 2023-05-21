import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from './hero';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  hero!: Hero;

  ngOnInit(): void {
    // get hero when `id` param changes
    this.route.paramMap.subscribe((pmap) => this.getHero(pmap.get('id')));
  }

  private getHero(id: string | null): void {
    // when no id or id===0, create new blank hero
    if (!id) {
      this.hero = { id: 0, name: '' } as Hero;
    }
  }

  cancel() {
    this.gotoList();
  }

  gotoList() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
