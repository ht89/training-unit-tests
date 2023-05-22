import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { TwainService } from './twain.service';
import { Observable, of, throwError } from 'rxjs';
import { TwainComponent } from './twain.component';

class TwainServiceStub {
  getQuote() {}
}

describe('TwainComponent', () => {
  let fixture: ComponentFixture<TwainComponent>;
  let component: TwainComponent;
  let twainService: TwainService;

  let quoteEl: HTMLElement;
  let getQuoteSpy: jest.SpyInstance<Observable<string>, [], any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TwainComponent],
    }).overrideComponent(TwainComponent, {
      set: {
        providers: [{ provide: TwainService, useClass: TwainServiceStub }],
      },
    });

    fixture = TestBed.createComponent(TwainComponent);
    component = fixture.componentInstance;
    twainService = fixture.debugElement.injector.get(TwainService);

    quoteEl = fixture.nativeElement.querySelector('.twain');
    getQuoteSpy = jest.spyOn(twainService, 'getQuote');
  });

  it('should show quote after component initialized', () => {
    // Arrange
    const testQuote = 'Test Quote';

    // the spy result returns synchronously
    getQuoteSpy.mockReturnValue(of(testQuote));

    // Act
    fixture.detectChanges();

    // Assert
    expect(quoteEl.textContent).toBe(testQuote);
    expect(getQuoteSpy).toHaveBeenCalledTimes(1);
  });

  it('should display error when QuoteService fails', fakeAsync(() => {
    // Arrange
    getQuoteSpy.mockReturnValue(
      throwError(() => new Error('QuoteService test failure'))
    );

    // Act
    fixture.detectChanges();
    tick(); // flush the component's setTimeout() by advancing the virtual clock
    fixture.detectChanges(); // update errorMessage within setTimeout()

    // Assert
    expect(component.errorMessage).toMatch(/test failure/);
    expect(quoteEl.textContent).toBe('...');
  }));
});
