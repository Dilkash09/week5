import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, FormsModule],
  templateUrl: './navigation-component.html',
  styleUrls: ['./navigation-component.css']
})
export class NavigationComponent {
  
  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUsername(): string {
    const user = this.authService.getCurrentUser();
    return user ? user.username : '';
  }
}