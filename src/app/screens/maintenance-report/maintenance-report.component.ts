import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';
import { ReportService, MaintenanceReport } from '../../services/report.service';

@Component({
  selector: 'app-maintenance-report',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div>
      <h2>Submit Maintenance Report</h2>
      <form (submit)="submitReport(); $event.preventDefault()">
        <label>Equipment:</label>
        <select [(ngModel)]="equipment" name="equipment" required>
          <option *ngFor="let eq of equipmentList" [value]="eq">{{ eq }}</option>
        </select>

        <label>Description:</label>
        <textarea [(ngModel)]="description" name="description" required></textarea>

        <button type="button" (click)="captureImage()">Capture Image</button>
        <div *ngIf="image">
          <img [src]="image" width="150" />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  `,
})
export class MaintenanceReportComponent {
  equipment = '';
  equipmentList = ['Conveyor 1', 'Pump A', 'Furnace 3'];
  description = '';
  image: string | null = null;

  constructor(private router: Router, private reportService: ReportService, private auth: AuthService) {}

  async captureImage() {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 90,
    });
    this.image = photo.dataUrl;
  }

  async submitReport() {
    const currentUserId = 'currentUser'; // Replace with actual user UID

    const report: MaintenanceReport = {
      equipment: this.equipment,
      description: this.description,
      image: this.image,
      timestamp: new Date().toISOString(),
      submittedBy: currentUserId,
    };

    await this.reportService.submitReport(report);
    this.router.navigate(['/dashboard/operator']);
  }
}
