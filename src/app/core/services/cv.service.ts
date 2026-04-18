import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { CV } from '../../models/cv.model';

@Injectable({
  providedIn: 'root'
})
export class CVService {
  private cv$: Observable<CV> | null = null;

  constructor(private http: HttpClient) {}

  /**
   * Get CV data — cached after first load
   * Uses shareReplay to prevent multiple HTTP requests
   */
  getCV(): Observable<CV> {
    if (!this.cv$) {
      this.cv$ = this.http.get<CV>('assets/data/cv.json').pipe(
        shareReplay(1) // Cache the result
      );
    }
    return this.cv$;
  }
}
