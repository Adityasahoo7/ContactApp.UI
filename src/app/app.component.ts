import { Component } from '@angular/core';
import { IdleService } from './core/services/idleservice.service';
import { AutoLogoutService } from './core/services/auto-logout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   //constructor(private idleService: IdleService) {}
  title = 'Contact_UI';
    constructor(private autoLogoutService: AutoLogoutService) {}
}
