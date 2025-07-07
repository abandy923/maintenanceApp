import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Firestore, docData, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Task {
  id: string;
  machineId: string;
  description: string;
  imageUrl?: string;
  status: string;
  timestamp: number;
}

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Task Detail</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding" *ngIf="task$ | async as task">
      <ion-card>
        <img *ngIf="task.imageUrl" [src]="task.imageUrl" />
        <ion-card-header>
          <ion-card-title>{{ task.machineId }}</ion-card-title>
          <ion-card-subtitle>Status: {{ task.status }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <p>{{ task.description }}</p>
          <p><small>{{ task.timestamp | date: 'short' }}</small></p>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
})
export class TaskDetailPage implements OnInit {
  private firestore = inject(Firestore);
  private route = inject(ActivatedRoute);

  task$!: Observable<Task | undefined>;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const docRef = doc(this.firestore, `maintenanceRequests/${id}`);
      this.task$ = docData(docRef, { idField: 'id' }) as Observable<Task>;
    }
  }
}
