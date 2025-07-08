import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-technician-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard">
      <h2>Technician Dashboard</h2>
      <p>Welcome, Technician! Here you can:</p>
      <ul>
        <li>Submit new maintenance reports</li>
        <li>View assigned maintenance reports</li>
        <li>Update status of reports</li>
      </ul>
      <div class="actions">
        <button routerLink="/submit-report">Submit Maintenance Report</button>
        <button routerLink="/technician-reports">View Reports</button>
        <button (click)="logout()">Logout</button>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 2rem;
      background: #f9f9f9;
    }
    h2 {
      color: #222;
      margin-bottom: 1rem;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      margin-bottom: 0.5rem;
      background: #fff;
      padding: 0.75rem;
      border-radius: 6px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.1);
    }
    .actions {
      margin-top: 1.5rem;
      display: flex;
      gap: 1rem;
    }
    button {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      background-color: #3880ff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #3171e0;
    }
  `]
})
export class TechnicianDashboardComponent {
  private auth = inject(Auth);
  private router = inject(Router);

  logout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/']);
    });
  }
}


