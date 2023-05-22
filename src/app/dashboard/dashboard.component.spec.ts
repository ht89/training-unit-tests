import { TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
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
import { Hero } from '../hero/hero';
import { click } from '../../testing';

function getTestHeroes(): Hero[] {
  return [
    { id: 41, name: 'Bob' },
    { id: 42, name: 'Carol' },
    { id: 43, name: 'Ted' },
    { id: 44, name: 'Alice' },
    { id: 45, name: 'Speedy' },
    { id: 46, name: 'Stealthy' },
  ];
}

let comp: DashboardComponent;
let harness: RouterTestingHarness;

describe('DashboardComponent (deep)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [DashboardModule] });
  });

  compileAndCreate();

  tests(clickForDeep);

  function clickForDeep() {
    // get first <div class="hero">
    const heroEl: HTMLElement =
      harness.routeNativeElement!.querySelector('.hero')!;

    click(heroEl);

    return firstValueFrom(
      TestBed.inject(Router).events.pipe(
        filter((e) => e instanceof NavigationEnd)
      )
    );
  }
});

/** Add TestBed providers, compile, and create DashboardComponent */
function compileAndCreate() {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: '**', component: DashboardComponent }]),
        provideHttpClient(),
        provideHttpClientTesting(),
        HeroService,
      ],
    })
      .compileComponents()
      .then(async () => {
        harness = await RouterTestingHarness.create();
        comp = await harness.navigateByUrl('/', DashboardComponent);

        TestBed.inject(HttpTestingController)
          .expectOne('api/heroes')
          .flush(getTestHeroes());
      });
  }));
}

/**
 * The (almost) same tests for both.
 * Only change: the way that the first hero is clicked
 */
function tests(heroClick: () => Promise<unknown>) {
  describe('after get dashboard heroes', () => {
    let router: Router;

    // Trigger component so it gets heroes and binds to them
    beforeEach(waitForAsync(() => {
      router = TestBed.inject(Router);
      harness.detectChanges(); // runs ngOnInit -> getHeroes
    }));

    it('should HAVE heroes', () => {
      expect(comp.heroes.length).toBeGreaterThan(0);
    });

    it('should DISPLAY heroes', () => {
      // Find and examine the displayed heroes
      // Look for them in the DOM by css class
      const heroes =
        harness.routeNativeElement!.querySelectorAll('dashboard-hero');
      expect(heroes.length).toBe(4);
    });

    it('should tell navigate when hero clicked', fakeAsync(async () => {
      tick();

      await heroClick(); // trigger click on first inner <div class="hero">

      // expecting to navigate to id of the component's first hero
      const id = comp.heroes[0].id;
      expect(router.url).toEqual(`/heroes/${id}`);
    }));
  });
}
