import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';

describe('BannerComponent (inline template)', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let h1: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannerComponent],
    });

    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;

    h1 = fixture.nativeElement.querySelector('h1');
  });

  it('should have no title in the DOM after createComponent()', () => {
    // Assert
    expect(h1.textContent).toEqual('');
  });

  it('should display original title after detectChanges()', () => {
    // Act
    fixture.detectChanges();

    // Assert
    expect(h1.textContent).toContain(component.title);
  });

  it('should display a different test title', () => {
    // Arrange
    component.title = 'Test Title';

    // Act
    fixture.detectChanges();

    // Assert
    expect(h1.textContent).toContain('Test Title');
  });
});
