import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { MaintenanceService } from '../services/maintenance.service';

@Component({
  selector: 'app-report-issue',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Report Issue</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <form (submit)="submitIssue()">
        <ion-item>
          <ion-label position="floating">Machine ID</ion-label>
          <ion-input [(ngModel)]="machineId" name="machineId" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Description</ion-label>
          <ion-textarea [(ngModel)]="description" name="description" required></ion-textarea>
        </ion-item>
        <ion-button expand="block" type="button" (click)="takePhoto()">Take Photo</ion-button>
        <ion-img *ngIf="imageData" [src]="imageData"></ion-img>
        <ion-button expand="block" type="submit">Submit</ion-button>
      </form>
    </ion-content>
  `,
})
export class ReportIssuePage {
  machineId = '';
  description = '';
  imageData: string | null = null;

  constructor(private maintenanceService: MaintenanceService) {}

  async takePhoto() {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 90,
    });
    this.imageData = 'data:image/jpeg;base64,' + photo.base64String;
  }

  submitIssue() {
    if (!this.machineId || !this.description) {
      alert('Please fill all fields');
      return;
    }
    this.maintenanceService
      .submitIssue({
        machineId: this.machineId,
        description: this.description,
        imageData: this.imageData,
      })
      .then(() => {
        alert('Issue submitted!');
        this.machineId = '';
        this.description = '';
        this.imageData = null;
      })
      .catch((err) => alert('Error submitting issue: ' + err.message));
  }
}
