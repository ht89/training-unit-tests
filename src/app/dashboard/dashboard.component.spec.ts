import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router, NavigationEnd, provideRouter } from '@angular/router';
import { firstValueFrom, filter } from 'rxjs';
import { DashboardModule } from './dashboard.module';
import { provideHttpClient } from '@angular/common/http';
import { HeroService } from '../hero/hero.service';
import { DashboardComponent } from './dashboard.component';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { click } from '../../testing';
import { getTestHeroes } from '../model/testing';

describe('DashboardComponent', () => {
  let comp: DashboardComponent;
  let harness: RouterTestingHarness;
  let router: Router;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [DashboardModule],
      providers: [
        provideRouter([{ path: '**', component: DashboardComponent }]),
        provideHttpClient(),
        provideHttpClientTesting(),
        HeroService,
      ],
    });

    harness = await RouterTestingHarness.create();
    comp = await harness.navigateByUrl('/', DashboardComponent);

    // mock API call
    TestBed.inject(HttpTestingController)
      .expectOne('api/heroes')
      .flush(getTestHeroes());

    router = TestBed.inject(Router);

    // runs ngOnInit -> getHeroes
    harness.detectChanges();
  });

  it('should have heroes', () => {
    expect(comp.heroes.length).toBeGreaterThan(0);
  });

  it('should display heroes', () => {
    // Assert
    // Find and examine the displayed heroes
    // Look for them in the DOM by css class
    const heroes =
      harness.routeNativeElement!.querySelectorAll('dashboard-hero');

    expect(heroes.length).toBe(4);
  });

  it('should tell navigate when hero clicked', fakeAsync(async () => {
    // Arrange
    // get first <div class="hero">
    const heroEl: HTMLElement =
      harness.routeNativeElement!.querySelector('.hero')!;

    // Act
    click(heroEl);

    await firstValueFrom(
      TestBed.inject(Router).events.pipe(
        filter((e) => e instanceof NavigationEnd)
      )
    );

    // Assert
    // expecting to navigate to id of the component's first hero
    const id = comp.heroes[0].id;
    expect(router.url).toEqual(`/heroes/${id}`);
  }));
});
