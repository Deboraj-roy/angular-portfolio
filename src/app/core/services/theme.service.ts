import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'theme';
  private readonly darkModeSubject = new BehaviorSubject<boolean>(this.getInitialTheme());

  readonly darkMode$ = this.darkModeSubject.asObservable();

  constructor() {
    this.initializeThemeListener();
  }

  /**
   * Get initial theme preference from localStorage or system preference
   */
  private getInitialTheme(): boolean {
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
    localStorage.setItem(this.STORAGE_KEY, isDark ? 'dark' : 'light');
    this.applyTheme(isDark);
  }

  /**
   * Get current theme (synchronous)
   */
  isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }
}
