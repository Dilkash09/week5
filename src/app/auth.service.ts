import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  username: string;
  birthdate: string;
  age: number;
  email: string;
  valid: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('http://localhost:3000/api/auth', { email, password }).pipe(
      tap(user => {
        if (user.valid) {
          this.setUser(user);
        }
      })
    );
  }

    logout(): void {
    // Clear local storage
    localStorage.removeItem('currentUser');
    
    // Clear the current user subject
    this.currentUserSubject.next(null);
    
    console.log('User logged out successfully');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  updateUser(updatedUser: User): void {
    this.setUser(updatedUser);
  }

  private setUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        this.currentUserSubject.next(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }
  testServerConnection(): Observable<any> {
    return this.http.get('/api/health');
  }
}