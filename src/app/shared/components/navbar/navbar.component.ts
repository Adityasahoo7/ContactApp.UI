import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  // Used in *ngIf to hide navbar on login/signup routes
  // shouldShowNavbar(): boolean {
  //   const currentUrl = this.router.url;
  //   return !(currentUrl === '/login' || currentUrl === '/signup');
  // }
   shouldShowNavbar(): boolean {
    // check for login routes where navbar should not appear
    const currentUrl = this.router.url;
    const isLoginOrSignupPage = currentUrl === '/login' || currentUrl === '/signup';

    // ✅ Show navbar only if token exists AND not on login/signup page
    return !!localStorage.getItem('token') && !isLoginOrSignupPage;
  }

  // isLoggedIn(): boolean {
  //   return !!localStorage.getItem('token');
  // }
//   isLoggedIn(): boolean {
//   const token = localStorage.getItem('token');
//   return !!token; // will return true if token exists
// }


 logout(): void {
  localStorage.removeItem('token');
   localStorage.removeItem('role');
   localStorage.removeItem('isLoggedIn')
  this.router.navigate(['/login']);
}
ngOnInit() {
  console.log('Token in storage:', localStorage.getItem('token'));
}

getUserRole(): string {
  return localStorage.getItem('role') || '';
}

isAdmin(): boolean {
  return this.getUserRole() === 'Admin';
}

isUser(): boolean {
  return this.getUserRole() === 'User';
}



}
