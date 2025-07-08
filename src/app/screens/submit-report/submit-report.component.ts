import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { RouterModule, Router } from '@angular/router';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-submit-report',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, RouterModule],
  template: `
    <div class="submit-report">
      <h2>Submit Maintenance Report</h2>

      <form (ngSubmit)="submitReport()">
        <label>
          Equipment ID:
          <input [(ngModel)]="equipmentId" name="equipmentId" required />
        </label>

        <label>
          Issue Description:
          <textarea [(ngModel)]="description" name="description" required></textarea>
        </label>

        <button type="button" (click)="takePhoto()">Take Photo</button>

        <div *ngIf="photo">
          <p>Photo Preview:</p>
          <img [src]="photo" class="photo-preview" />
        </div>

        <div class="form-buttons">
          <button type="submit" [disabled]="loading">Submit Report</button>
          <button type="button" (click)="goBack()">Go Back</button>
        </div>
      </form>

      <p *ngIf="successMessage" class="success-message">{{ successMessage }}</p>
      <p *ngIf="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  `,
  styles: [`
    .submit-report { padding: 2rem; background: #f4f5f8; }
    h2 { margin-bottom: 1.5rem; color: #222; }
    form { display: flex; flex-direction: column; gap: 1rem; max-width: 500px; }
    label { display: flex; flex-direction: column; font-weight: 600; color: #444; }
    input, textarea { padding: 0.5rem; font-size: 1rem; border: 1px solid #ccc; border-radius: 4px; }
    .photo-preview { max-width: 100%; border: 1px solid #ccc; border-radius: 4px; margin-top: 0.5rem; }
    .form-buttons { display: flex; gap: 1rem; margin-top: 1rem; }
    button { padding: 0.75rem; font-size: 1rem; background-color: #3880ff; color: white; border: none; border-radius: 4px; cursor: pointer; }
    button[type="button"] { background-color: #ccc; color: #333; }
    button:hover { opacity: 0.9; }
    .success-message { color: green; margin-top: 1rem; }
    .error-message { color: red; margin-top: 1rem; }
  `]
})
export class SubmitReportComponent {
  equipmentId = '';
  description = '';
  photo: string | null = null;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private router: Router, private firestore: Firestore) {}

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });
      this.photo = image.dataUrl ?? null;
    } catch (err) {
      console.error('Camera error', err);
    }
  }

  async submitReport() {
    if (!this.equipmentId || !this.description) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      await addDoc(collection(this.firestore, 'maintenanceReports'), {
        equipmentId: this.equipmentId,
        description: this.description,
        photo: this.photo,
        createdAt: serverTimestamp(),
        status: 'Pending',
      });

      this.successMessage = 'Report submitted successfully!';
      this.equipmentId = '';
      this.description = '';
      this.photo = null;
    } catch (error) {
      console.error('Error saving report:', error);
      this.errorMessage = 'Failed to submit report.';
    } finally {
      this.loading = false;
    }
  }

  goBack() {
    this.router.navigate(['/dashboard/operator']);
  }
}


