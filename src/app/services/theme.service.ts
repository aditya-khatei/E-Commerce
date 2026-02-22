import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkSource = new BehaviorSubject<boolean>(false);
  isDark$ = this.isDarkSource.asObservable();

  constructor() {
    this.initTheme();
  }

  initTheme() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    this.isDarkSource.next(isDark);
    this.updateBodyClass(isDark);
  }

  toggleTheme() {
    const newTheme = !this.isDarkSource.value;
    this.isDarkSource.next(newTheme);
    localStorage.setItem('darkMode', newTheme.toString());
    this.updateBodyClass(newTheme);
  }

  private updateBodyClass(isDark: boolean) {
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
