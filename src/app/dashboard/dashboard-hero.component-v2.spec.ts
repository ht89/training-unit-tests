import { Component } from '@angular/core';
import { Hero } from './hero';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardHeroComponent } from './dashboard-hero.component';

@Component({
  template: `
    <dashboard-hero [hero]="hero" (selected)="onSelected($event)">
    </dashboard-hero>
  `,
})
class TestHostComponent {
  hero: Hero = { id: 42, name: 'Test Name' };

  selectedHero: Hero | undefined;

  onSelected(hero: Hero) {
    this.selectedHero = hero;
  }
}

describe('DashboardHeroComponent (Using Test Host)', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  let heroEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardHeroComponent, TestHostComponent],
    });

    // create TestHostComponent instead of DashboardHeroComponent
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;

    heroEl = fixture.nativeElement.querySelector('.hero');

    // Act
    fixture.detectChanges();
  });

  it('should display hero name', () => {
    // Arrange
    const expectedPipedName = testHost.hero.name.toUpperCase();

    // Assert
    expect(heroEl.textContent).toContain(expectedPipedName);
  });

  it('should raise selected event when clicked', () => {
    // Act
    heroEl.click();

    // Assert
    expect(testHost.selectedHero).toBe(testHost.hero);
  });
});
