import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay } from 'rxjs';
import { CV } from '../../models/cv.model';

@Injectable({
  providedIn: 'root'
})
export class CVService {
  private cv$: Observable<CV> | null = null;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  /**
   * Get CV data — cached after first load
   * Uses shareReplay to prevent multiple HTTP requests
   */
  getCV(): Observable<CV> {
    if (!this.cv$) {
      if (!isPlatformBrowser(this.platformId)) {
        this.cv$ = of(this.getFallbackCV()).pipe(shareReplay(1));
      } else {
        this.cv$ = this.http.get<CV>('assets/data/cv.json').pipe(
          shareReplay(1) // Cache the result
        );
      }
    }
    return this.cv$;
  }

  private getFallbackCV(): CV {
    return {
      name: '',
      title: '',
      contact: [],
      summary: '',
      skills: [],
      experience: [],
      enterpriseProjects: [],
      projects: [],
      education: [],
      certifications: [],
      additional: {
        languages: '',
        interests: '',
        achievement: ''
      }
    };
  }
}
