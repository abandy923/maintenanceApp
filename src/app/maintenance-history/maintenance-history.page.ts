import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface MaintenanceRecord {
  id: string;
  machineId: string;
  description: string;
  imageUrl?: string;
  timestamp: number;
}

@Component({
  selector: 'app-maintenance-history',
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Maintenance History</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list *ngIf="records$ | async as records">
        <ion-item *ngFor="let record of records">
          <ion-label>
            <h2>{{ record.machineId }}</h2>
            <p>{{ record.description }}</p>
            <small>{{ record.timestamp | date: 'short' }}</small>
          </ion-label>
          <ion-thumbnail slot="end" *ngIf="record.imageUrl">
            <img [src]="record.imageUrl" />
          </ion-thumbnail>
        </ion-item>
      </ion-list>
      <ion-text *ngIf="!(records$ | async)?.length">No maintenance records found.</ion-text>
    </ion-content>
  `,
})
export class MaintenanceHistoryPage implements OnInit {
  records$: Observable<MaintenanceRecord[]>;

  constructor(private firestore: Firestore) {
    const recordsCollection = collection(this.firestore, 'maintenanceRequests');
    this.records$ = collectionData(recordsCollection, { idField: 'id' }) as Observable<MaintenanceRecord[]>;
  }

  ngOnInit() {}
}
