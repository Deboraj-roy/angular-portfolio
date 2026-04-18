import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { CV } from '../../models/cv.model';
import cvData from '../../../assets/data/cv.json';

@Injectable({
  providedIn: 'root'
})
export class CVService {
  private cv$: Observable<CV> | null = null;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  getCV(): Observable<CV> {
    if (!this.cv$) {
      if (!isPlatformBrowser(this.platformId)) {
        this.cv$ = of(this.getFallbackCV()).pipe(shareReplay(1));
      } else {
        this.cv$ = this.http.get<CV>('assets/data/cv.json').pipe(
          catchError(() => of(this.getFallbackCV())),
          shareReplay(1)
        );
      }
    }

    return this.cv$;
  }

  private getFallbackCV(): CV {
    return cvData as CV;
  }
}
