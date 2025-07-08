import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgFor, AsyncPipe } from '@angular/common';
import { Firestore, collectionData, collection, query, orderBy } from '@angular/fire/firestore';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-operator-reports',
  standalone: true,
  imports: [CommonModule, NgFor, AsyncPipe],
  template: `
    <div class="reports-container">
      <h2>Your Submitted Reports</h2>
      <ul *ngIf="reports$ | async as reports; else loading">
        <li *ngFor="let report of reports">
          <strong>Equipment ID:</strong> {{ report['equipmentId'] }} <br />
          <strong>Description:</strong> {{ report['description'] }} <br />
          <strong>Status:</strong> {{ report['status'] }} <br />
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
    .reports-container {
      padding: 2rem;
      background: #f9f9f9;
      max-width: 600px;
      margin: auto;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      background: white;
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 6px;
      box-shadow: 0 1px 5px rgba(0,0,0,0.1);
    }
    .report-photo {
      max-width: 100%;
      margin-top: 0.5rem;
      border-radius: 4px;
    }
          button {
      margin-top: 1rem;
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
export class OperatorReportsComponent implements OnInit {
  private firestore = inject(Firestore);
  private router = inject(Router);
  reports$ = collectionData(
    query(
      collection(this.firestore, 'maintenanceReports'),
      orderBy('createdAt', 'desc')
    ), { idField: 'id' }
  );

  ngOnInit() {}
   goBack() {
    this.router.navigate(['/dashboard/operator']);
  }
}

