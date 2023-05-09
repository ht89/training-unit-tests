import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ChuckNorrisComponent } from './chuck-norris.component';
import { QuoteService, RandomQuoteContext } from './quote.service';
import { Observable, of, throwError } from 'rxjs';

class QuoteServiceStub {
  getRandomQuote() {}
}

describe('Chuck Norris Component', () => {
  let fixture: ComponentFixture<ChuckNorrisComponent>;
  let component: ChuckNorrisComponent;
  let quoteService: QuoteService;

  let quoteEl: HTMLElement;
  let getQuoteSpy: jest.SpyInstance<
    Observable<string>,
    [context: RandomQuoteContext],
    any
  >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChuckNorrisComponent],
      providers: [{ provide: QuoteService, useClass: QuoteServiceStub }],
    });

    fixture = TestBed.createComponent(ChuckNorrisComponent);
    component = fixture.componentInstance;
    quoteService = TestBed.inject(QuoteService);

    quoteEl = fixture.nativeElement.querySelector('.chuck-norris');
    getQuoteSpy = jest.spyOn(quoteService, 'getRandomQuote');
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
