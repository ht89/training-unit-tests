import { asapScheduler, observeOn, of } from 'rxjs';
import { HeroService } from '../hero/hero.service';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { Component } from '@angular/core';
import { provideLocationMocks } from '@angular/common/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { HeroComponent } from '../hero/hero.component';
import { DashboardModule } from './dashboard.module';

const HEROES = [
  { id: 41, name: 'Bob' },
  { id: 42, name: 'Carol' },
  { id: 43, name: 'Ted' },
  { id: 44, name: 'Alice' },
  { id: 45, name: 'Speedy' },
  { id: 46, name: 'Stealthy' },
];

const leftMouseButton = 0;

@Component({
  standalone: true,
  template: '',
})
class TestHeroDetailComponent {}

async function setup() {
  const fakeService = {
    getHeroes() {
      return of([...HEROES]).pipe(observeOn(asapScheduler));
    },
  } as Partial<HeroService>;

  TestBed.configureTestingModule({
    imports: [DashboardModule],
    providers: [
      provideRouter([
        {
          path: '',
          pathMatch: 'full',
          component: DashboardComponent,
        },
        {
          path: 'heroes/:id',
          component: HeroComponent,
        },
      ]),
      provideLocationMocks(),
      { provide: HeroService, useValue: fakeService },
    ],
  });

  const harness = await RouterTestingHarness.create();
  const location = TestBed.inject(Location);

  return {
    advance() {
      tick();
      harness.detectChanges();
    },
    clickTopHero() {
      const firstHeroBtn = harness.routeDebugElement!.query(By.css('.hero'));

      firstHeroBtn.triggerEventHandler('click', {
        button: leftMouseButton,
      });
    },
    harness,
    location,
  };
}

describe('DashboardComponent', () => {
  it('navigates to the detail view when a hero button is clicked', fakeAsync(async () => {
    // Arrange
    const { advance, clickTopHero, harness, location } = await setup();
    const component = await harness.navigateByUrl('/', DashboardComponent);
    const [topHero] = component.heroes;

    // Act
    clickTopHero();
    advance();

    // Assert
    const expectedPath = '/heroes/' + topHero.id;
    expect(location.path()).toBe(expectedPath);
  }));
});
