import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role-selection',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="role-selection-container">
      <h2>Select Your Role</h2>
      <button (click)="selectRole('operator')">Operator</button>
      <button (click)="selectRole('technician')">Technician</button>
      <button (click)="selectRole('manager')">Manager</button>
    </div>
  `,
  styles: [`
    .role-selection-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
      gap: 1rem;
    }

    h2 {
      margin-bottom: 1rem;
      color: #222;
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
export class RoleSelectionComponent {
  private router = inject(Router);

  selectRole(role: string) {
  switch (role) {
    case 'operator':
      this.router.navigate(['/dashboard/operator']);
      break;
    case 'technician':
      this.router.navigate(['/dashboard/technician']);
      break;
    case 'manager':
      this.router.navigate(['/dashboard/manager']);
      break;
  }
}

}

