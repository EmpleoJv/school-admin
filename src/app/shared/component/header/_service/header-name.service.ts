import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class HeaderNameService {
  private headerNameSubject = new BehaviorSubject<string>('Leaderboard');
  headerName$ = this.headerNameSubject.asObservable();

  setHeaderName(name: string) {
    this.headerNameSubject.next(name);
  }
}
