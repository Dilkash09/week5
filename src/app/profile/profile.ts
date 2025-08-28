import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, User } from '../auth.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule } from '@angular/forms'; // Add ReactiveFormsModule


@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule ,ReactiveFormsModule,],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      birthdate: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.profileForm.patchValue(this.currentUser);
  }

  onSubmit(): void {
    if (this.profileForm.valid && this.currentUser) {
      const updatedUser: User = {
        ...this.currentUser,
        ...this.profileForm.value
      };
      
      this.authService.updateUser(updatedUser);
      alert('Profile updated successfully!');
    }
  }
}