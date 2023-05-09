import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, startWith } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { QuoteService } from './quote.service';

@Component({
  standalone: true,
  selector: 'chuck-norris-quote',
  template: ` <p class="chuck-norris">
      <i>{{ quote | async }}</i>
    </p>

    <button type="button" (click)="getQuote()">Next quote</button>

    <p class="error" *ngIf="errorMessage">{{ errorMessage }}</p>`,
  styles: ['.chuck-norris { font-style: italic; } .error { color: red; }'],
  imports: [CommonModule],
})
export class ChuckNorrisComponent implements OnInit {
  errorMessage!: string;
  quote!: Observable<string>;

  constructor(private readonly service: QuoteService) {}

  ngOnInit(): void {
    this.getQuote();
  }

  getQuote() {
    this.errorMessage = '';

    this.quote = this.service.getRandomQuote({ category: 'dev' }).pipe(
      startWith('...'),
      catchError((err: any) => {
        // Wait a turn because errorMessage already set once this turn
        setTimeout(() => (this.errorMessage = err.message || err.toString()));
        return of('...'); // reset message to placeholder
      })
    );
  }
}
