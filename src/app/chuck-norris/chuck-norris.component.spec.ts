import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChuckNorrisComponent } from './chuck-norris.component';
import { QuoteService } from './quote.service';
import { of } from 'rxjs';

class QuoteServiceStub {
  getRandomQuote() {}
}

describe('Chuck Norris Component', () => {
  let fixture: ComponentFixture<ChuckNorrisComponent>;
  let component: ChuckNorrisComponent;
  let quoteService: QuoteService;

  let quoteEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChuckNorrisComponent],
      providers: [{ provide: QuoteService, useClass: QuoteServiceStub }],
    });

    fixture = TestBed.createComponent(ChuckNorrisComponent);
    component = fixture.componentInstance;
    quoteService = TestBed.inject(QuoteService);

    quoteEl = fixture.nativeElement.querySelector('.chuck-norris');
  });

  it('should show quote after component initialized', () => {
    // Arrange
    const getQuoteSpy = jest.spyOn(quoteService, 'getRandomQuote');
    const testQuote = 'Test Quote';

    getQuoteSpy.mockReturnValue(of(testQuote));

    // Act
    fixture.detectChanges();

    // Assert
    expect(quoteEl.textContent).toBe(testQuote);
    expect(getQuoteSpy).toHaveBeenCalledTimes(1);
  });
});
