import { Injectable } from '@angular/core';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

export interface MaintenanceReport {
  id?: string;
  equipment: string;
  description: string;
  image?: string | null;
  timestamp: string;
  submittedBy: string;
}

@Injectable({ providedIn: 'root' })
export class ReportService {
  private reportsRef = collection(db, 'maintenanceReports');

  async submitReport(report: MaintenanceReport) {
    await addDoc(this.reportsRef, report);
  }
}
