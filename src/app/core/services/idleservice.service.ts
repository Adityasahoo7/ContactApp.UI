import { Injectable } from '@angular/core';
import { Idle } from '@ng-idle/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class IdleService {
  constructor(private idle: Idle, private router: Router) {
    this.setupIdleTimer();
  }

  setupIdleTimer() {
    this.idle.setIdle(900); // 15 minutes
    this.idle.setTimeout(10); // extra timeout if needed

    this.idle.onTimeout.subscribe(() => {
      alert('Session expired due to inactivity');
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    });

    this.idle.onIdleEnd.subscribe(() => {
      console.log('User is active again');
    });

    this.idle.watch();
  }

  resetIdleTimer() {
    this.idle.watch(); // reset watch if needed
  }
}
