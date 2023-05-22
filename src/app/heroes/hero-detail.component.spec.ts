import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { HeroModule } from './heroes.module';
import { Hero } from '../model/hero';
import { getTestHeroes } from '../model/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroesComponent } from './heroes.component';

let component: HeroDetailComponent;
let harness: RouterTestingHarness;
let page: Page;

describe('HeroDetailComponent', () => {
  const firstHero = getTestHeroes()[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroModule],
      providers: [
        provideRouter([
          { path: 'heroes/:id', component: HeroDetailComponent },
          { path: 'heroes', component: HeroesComponent },
        ]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  describe('when navigating to existing hero', () => {
    let expectedHero: Hero;

    beforeEach(async () => {
      expectedHero = firstHero;

      await createComponent(expectedHero.id);
    });

    it("should display that hero's name", () => {
      expect(page.nameDisplay.textContent).toBe(expectedHero.name);
    });
  });

  describe('when navigate to non-existent hero', () => {
    beforeEach(async () => {
      await createComponent(999);
    });

    it('should try to navigate back to hero list', () => {
      expect(TestBed.inject(Router).url).toEqual('/heroes');
    });
  });
});

/** Create the HeroDetailComponent, initialize it, set test variables  */
async function createComponent(id: number) {
  harness = await RouterTestingHarness.create();
  component = await harness.navigateByUrl(`/heroes/${id}`, HeroDetailComponent);
  page = new Page();

  const request = TestBed.inject(HttpTestingController).expectOne(
    `api/heroes/?id=${id}`
  );

  const hero = getTestHeroes().find((h) => h.id === Number(id));
  request.flush(hero ? [hero] : []);

  harness.detectChanges();
}

class Page {
  // getter properties wait to query the DOM until called.
  get buttons() {
    return this.queryAll<HTMLButtonElement>('button');
  }
  get saveBtn() {
    return this.buttons[0];
  }
  get cancelBtn() {
    return this.buttons[1];
  }
  get nameDisplay() {
    return this.query<HTMLElement>('span');
  }
  get nameInput() {
    return this.query<HTMLInputElement>('input');
  }

  //// query helpers ////
  private query<T>(selector: string): T {
    return harness.routeNativeElement!.querySelector(selector)! as T;
  }

  private queryAll<T>(selector: string): T[] {
    return harness.routeNativeElement!.querySelectorAll(selector) as any as T[];
  }
}
