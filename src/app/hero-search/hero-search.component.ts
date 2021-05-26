import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})

export class HeroSearchComponent implements OnInit {
  heroes$?: Observable<Hero[]>;

  /* an observable that also is a source of observables
        we can subscribe, but also push values by calling next(value) */
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  search(term: string): void {
    this.searchTerms.next(term);  // push a search term into the "observable stream"
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),  // wait 300 ms after each keystroke, ie wait for pause in typing for efficiency
      distinctUntilChanged(),  // ignore new term if hasn't changed
      // switch to new observable when term changes, ensures old requests are thrown out if they aren't the most recent
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}
