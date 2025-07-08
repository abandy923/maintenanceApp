import { Component, inject } from '@angular/core';
import { CommonModule, NgFor, AsyncPipe, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Firestore, collection, query, orderBy, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-technician-reports',
  standalone: true,
  imports: [CommonModule, NgFor, AsyncPipe, NgIf, RouterModule, FormsModule],
  template: `
    <div class="reports-container">
      <h2>All Maintenance Reports</h2>
      <ul *ngIf="reports$ | async as reports; else loading">
        <li *ngFor="let report of reports">
          <strong>Equipment ID:</strong> {{ report['equipmentId'] }} <br />
          <strong>Description:</strong> {{ report['description'] }} <br />
          <strong>Status:</strong>
          <select [(ngModel)]="report['status']" (change)="updateStatus(report)">
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <div *ngIf="report['photo']">
            <img [src]="report['photo']" class="report-photo" />
          </div>
          <hr />
        </li>
      </ul>
      <ng-template #loading><p>Loading reports...</p></ng-template>
      <button (click)="goBack()">Go Back</button>
    </div>
  `,
  styles: [`
    .reports-container { padding: 2rem; max-width: 700px; margin: auto; background: #f4f5f8; }
    ul { list-style: none; padding: 0; }
    li { background: white; padding: 1rem; margin-bottom: 1rem; border-radius: 6px; box-shadow: 0 1px 5px rgba(0,0,0,0.1); }
    .report-photo { max-width: 100%; margin-top: 0.5rem; border-radius: 4px; }
    select { margin-top: 0.5rem; padding: 0.5rem; }
    button { margin-top: 1rem; padding: 0.75rem 1.5rem; background-color: #3880ff; color: white; border: none; border-radius: 4px; cursor: pointer; }
    button:hover { background-color: #3171e0; }
  `]
})
export class TechnicianReportsComponent {
  private firestore = inject(Firestore);
  private router = inject(Router);

  reports$ = collectionData(
    query(collection(this.firestore, 'maintenanceReports'), orderBy('createdAt', 'desc')),
    { idField: 'id' }
  );

  async updateStatus(report: any) {
    if (!report?.id) return;
    const ref = doc(this.firestore, 'maintenanceReports', report.id);
    try {
      await updateDoc(ref, { status: report['status'] });
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update report status.');
    }
  }

  goBack() {
    this.router.navigate(['/dashboard/technician']);
  }
}


