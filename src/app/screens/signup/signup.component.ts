import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgIf],
  template: `
    <div style="display: flex; flex-direction: column; align-items: center; padding: 2rem;">
      <div style="width: 100%; max-width: 400px; background: #fff; padding: 2rem; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <button (click)="goBack()" style="background: none; border: none; color: #007bff; margin-bottom: 1rem; cursor: pointer;">← Back</button>

        <h2 style="margin-bottom: 1.5rem; font-size: 1.5rem; text-align: center;">Create Account</h2>
        
        <form (ngSubmit)="signup()" style="display: flex; flex-direction: column; gap: 1rem;">
          <input [(ngModel)]="email" name="email" type="email" placeholder="Email" required 
                 style="padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px;" />
          
          <input [(ngModel)]="password" name="password" type="password" placeholder="Password" required 
                 style="padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px;" />
          
          <button type="submit" 
                  style="padding: 0.75rem; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Sign Up
          </button>

          <div *ngIf="error" style="color: red; font-size: 0.9rem; text-align: center;">{{ error }}</div>
        </form>

        <p style="text-align: center; margin-top: 1rem;">
          Already have an account? <a routerLink="/" style="color: #007bff;">Login</a>
        </p>
      </div>
    </div>
  `,
  

})
export class SignupComponent {
  email = '';
  password = '';
  error = '';

  private router = inject(Router);
  private auth = inject(Auth);

  signup() {
    if (!this.email || !this.password) {
      this.error = 'Email and password required';
      return;
    }

    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => this.router.navigate(['/select-role']))
      .catch(err => {
        console.error(err);
        this.error = 'Signup failed: ' + err.message;
      });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}


