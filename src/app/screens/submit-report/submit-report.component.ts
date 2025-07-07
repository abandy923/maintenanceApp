import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { RouterModule, Router } from '@angular/router';

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
          <button type="submit">Submit Report</button>
          <button type="button" (click)="goBack()">Go Back</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .submit-report {
      padding: 2rem;
      background: #f4f5f8;
    }
    h2 {
      margin-bottom: 1.5rem;
      color: #222;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 500px;
    }
    label {
      display: flex;
      flex-direction: column;
      font-weight: 600;
      color: #444;
    }
    input, textarea {
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .photo-preview {
      max-width: 100%;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-top: 0.5rem;
    }
    .form-buttons {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }
    button {
      padding: 0.75rem;
      font-size: 1rem;
      background-color: #3880ff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button[type="button"] {
      background-color: #ccc;
      color: #333;
    }
    button:hover {
      opacity: 0.9;
    }
  `]
})
export class SubmitReportComponent {
  equipmentId = '';
  description = '';
  photo: string | null = null;

  constructor(private router: Router) {}

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

  submitReport() {
    console.log('Submitting report:', {
      equipmentId: this.equipmentId,
      description: this.description,
      photo: this.photo,
    });
    alert('Report submitted!');
    this.router.navigate(['/dashboard/operator']);
  }

  goBack() {
    this.router.navigate(['/dashboard/operator']);
  }
}

