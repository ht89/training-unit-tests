import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardHeroComponent } from './dashboard-hero.component';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs';
import { DebugElement } from '@angular/core';
import { Hero } from '../model/hero';
import { click } from '../../testing';

describe('DashboardHeroComponent', () => {
  let component: DashboardHeroComponent;
  let fixture: ComponentFixture<DashboardHeroComponent>;

  let heroDe: DebugElement;
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

  /*
    This small test demonstrates how Angular tests can verify a component's visual representation —
    something not possible with component class tests —
    at low cost and without resorting to much slower and more complicated end-to-end tests.
  */
  it('should display hero name in uppercase', () => {
    // Arrange
    const expectedPipedName = expectedHero.name.toUpperCase();

    // Assert
    expect(heroEl.textContent).toContain(expectedPipedName);
  });

  it('should raise selected event when clicked (triggerEventHandler)', () => {
    // Arrange
    let selectedHero: Hero | undefined;

    /*
      "selected" returns an EventEmitter that acts like an RxJS synchronous Observable.
      The test subscribes to it explicitly just as the host component does implicitly
    */
    component.selected
      .pipe(first())
      .subscribe((hero: Hero) => (selectedHero = hero));

    // Act
    click(heroDe);

    // Assert
    expect(selectedHero).toBe(expectedHero);
  });
});
