import { Component, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, RouterModule],
  template: `
    <div class="login-wrapper">
      <div class="login-container">
        <h2>Login</h2>
        <form (submit)="login(); $event.preventDefault()">
          <label>Email</label>
          <input type="email" [(ngModel)]="email" name="email" required />

          <label>Password</label>
          <input type="password" [(ngModel)]="password" name="password" required />

          <button type="submit">Login</button>
        </form>
        <p class="error" *ngIf="error">{{ error }}</p>
        <p class="signup-link"><a routerLink="/signup">Don't have an account? Sign up</a></p>
      </div>
    </div>
  `,
  styles: [`
    .login-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: linear-gradient(to bottom right, #3880ff, #4dd0e1);
    }

    .login-container {
      background-color: #ffffff;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      width: 90%;
      max-width: 380px;
    }

    h2 {
      text-align: center;
      margin-bottom: 1.5rem;
      color: #222;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    label {
      font-weight: 500;
      color: #333;
    }

    input {
      padding: 0.6rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 6px;
    }

    button {
      padding: 0.75rem;
      font-size: 1rem;
      background-color: #3880ff;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #3171e0;
    }

    .error {
      color: red;
      margin-top: 0.5rem;
      text-align: center;
    }

    .signup-link {
      text-align: center;
      margin-top: 1rem;
    }

    .signup-link a {
      color: #3880ff;
      text-decoration: none;
    }

    .signup-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  private router = inject(Router);
  private auth = inject(Auth);

  login() {
    if (!this.email || !this.password) {
      this.error = 'Email and password required';
      return;
    }

    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => this.router.navigate(['/select-role']))
      .catch((err) => {
        console.error(err);
        this.error = 'Login failed: ' + err.message;
      });
  }
}
