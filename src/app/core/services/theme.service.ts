import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'theme';
  private readonly isBrowser: boolean;
  private readonly darkModeSubject: BehaviorSubject<boolean>;

  readonly darkMode$: Observable<boolean>;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.darkModeSubject = new BehaviorSubject<boolean>(this.getInitialTheme());
    this.darkMode$ = this.darkModeSubject.asObservable();
    this.applyTheme(this.darkModeSubject.value);
    this.initializeThemeListener();
  }

  /**
   * Get initial theme preference from localStorage or system preference
   */
  private getInitialTheme(): boolean {
    if (!this.isBrowser) {
      return false;
    }

    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      return saved === 'dark';
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  /**
   * Apply theme to document root
   */
  private applyTheme(isDark: boolean): void {
    if (!this.isBrowser) {
      return;
    }

    const htmlEl = document.documentElement;
    if (isDark) {
      htmlEl.setAttribute('data-theme', 'dark');
    } else {
      htmlEl.removeAttribute('data-theme');
    }
  }

  /**
   * Listen for system theme changes
   */
  private initializeThemeListener(): void {
    if (!this.isBrowser) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      // Only update if user hasn't explicitly set a preference
      if (!localStorage.getItem(this.STORAGE_KEY)) {
        this.darkModeSubject.next(e.matches);
        this.applyTheme(e.matches);
      }
    });
  }

  /**
   * Toggle theme and persist preference
   */
  toggleTheme(): void {
    const newMode = !this.darkModeSubject.value;
    this.setTheme(newMode);
  }

  /**
   * Set theme explicitly
   */
  setTheme(isDark: boolean): void {
    this.darkModeSubject.next(isDark);
    if (this.isBrowser) {
      localStorage.setItem(this.STORAGE_KEY, isDark ? 'dark' : 'light');
    }
    this.applyTheme(isDark);
  }

  /**
   * Get current theme (synchronous)
   */
  isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }
}
