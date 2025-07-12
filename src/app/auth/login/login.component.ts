import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

onLogin(): void {
  this.authService.login(this.username, this.password).subscribe({
    next: (response) => {
      // ✅ Store token & role from nested `data`
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
       localStorage.setItem('isLoggedIn', 'true');

      this.router.navigate(['/contacts']);
    },
    error: (err) => {
      this.errorMessage = 'Login failed: ' + err.message;
    }
  });
}


}
