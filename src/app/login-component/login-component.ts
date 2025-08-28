import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    // If user is already logged in, redirect to profile
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/profile']);
    }
    
    this.testServerConnection();
  }
   testServerConnection(): void {
    this.authService.testServerConnection().subscribe({
      next: (response) => {
        console.log('Server connection test:', response);
      },
      error: (error) => {
        console.error('Server connection failed:', error);
        this.errorMessage = 'Cannot connect to authentication server. Please make sure the server is running on port 3000.';
      }
    });
  }

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password';
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (user) => {
        if (user.valid) {
          this.router.navigate(['/profile']);
        } else {
          this.errorMessage = 'Invalid email or password';
        }
      },
      error: (error) => {
        this.errorMessage = 'Login failed. Please try again.';
        console.error('Login error:', error);
      }
    });
  }
}