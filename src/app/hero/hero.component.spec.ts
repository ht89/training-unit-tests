import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeroComponent } from './hero.component';
import { RouterTestingHarness } from '@angular/router/testing';
import { HeroModule } from './hero.module';
import { Hero } from '../model/hero';
import { getTestHeroes } from '../model/testing';

let component: HeroComponent;
let harness: RouterTestingHarness;
let page: Page;

describe('HeroComponent', () => {
  const firstHero = getTestHeroes()[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroModule],
      providers: [
        provideRouter([
          { path: 'heroes/:id', component: HeroComponent },
          // {path: 'heroes', component: HeroListComponent},
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
});

/** Create the HeroDetailComponent, initialize it, set test variables  */
async function createComponent(id: number) {
  harness = await RouterTestingHarness.create();
  component = await harness.navigateByUrl(`/heroes/${id}`, HeroComponent);
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
