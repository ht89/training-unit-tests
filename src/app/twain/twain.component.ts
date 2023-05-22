import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, startWith } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { TwainService } from './twain.service';

@Component({
  standalone: true,
  selector: 'twain-quote',
  template: ` <p class="twain">
      <i>{{ quote | async }}</i>
    </p>

    <button type="button" (click)="getQuote()">Next quote</button>

    <p class="error" *ngIf="errorMessage">{{ errorMessage }}</p>`,
  styles: ['.twain { font-style: italic; } .error { color: red; }'],
  imports: [CommonModule],
  providers: [TwainService],
})
export class TwainComponent implements OnInit {
  errorMessage!: string;
  quote!: Observable<string>;

  constructor(private readonly service: TwainService) {}

  ngOnInit(): void {
    this.getQuote();
  }

  getQuote() {
    this.errorMessage = '';

    this.quote = this.service.getQuote().pipe(
      startWith('...'),
      catchError((err: any) => {
        // Wait a turn because errorMessage already set once this turn
        setTimeout(() => (this.errorMessage = err.message || err.toString()));
        return of('...'); // reset message to placeholder
      })
    );
  }
}
