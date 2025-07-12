// src/app/core/services/auto-logout.service.ts
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AutoLogoutService {
  private timeoutId: any;
  private readonly TIMEOUT = 15 * 60 * 1000; // 15 minutes

  constructor(private router: Router, private ngZone: NgZone) {
    this.initListener();
    this.resetTimer();
  }

  initListener() {
    ['click', 'mousemove', 'keydown', 'scroll'].forEach(event => {
      window.addEventListener(event, () => this.resetTimer());
    });
  }

  resetTimer() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.logout();
    }, this.TIMEOUT);
  }

  logout() {
    alert('Session expired due to inactivity.');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
