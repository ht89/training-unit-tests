import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardHeroComponent } from './dashboard-hero.component';
import { By } from '@angular/platform-browser';
import { Hero } from './hero';

describe('DashboardHeroComponent', () => {
  let component: DashboardHeroComponent;
  let fixture: ComponentFixture<DashboardHeroComponent>;

  let heroDe;
  let heroEl: HTMLElement;
  let expectedHero: Hero;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardHeroComponent],
    });

    fixture = TestBed.createComponent(DashboardHeroComponent);
    component = fixture.componentInstance;

    // find the hero's DebugElement and element
    heroDe = fixture.debugElement.query(By.css('.hero'));
    heroEl = heroDe.nativeElement;

    // mock the hero supplied by the parent component
    expectedHero = { id: 42, name: 'Test Name' };

    // simulate the parent setting the input property with that hero
    component.hero = expectedHero;

    // trigger initial data binding
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display hero name in uppercase', () => {
    // Arrange
    const expectedPipedName = expectedHero.name.toUpperCase();

    // Assert
    expect(heroEl.textContent).toContain(expectedPipedName);
  });
});
