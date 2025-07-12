import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  signupData = {
    username: '',
    password: ''
  };

  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSignup(): void {
    if (this.signupData.username && this.signupData.password) {
      this.authService.signup(this.signupData).subscribe({
        next: () => {
          alert('Signup successful!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.errorMessage = 'Signup failed: ' + (err.error?.message || err.message);
        }
      });
    } else {
      this.errorMessage = 'Please fill in all fields.';
    }
  }
}
