import { Injectable } from '@angular/core';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';

@Injectable({ providedIn: 'root' })
export class ReportSummaryService {
  private reportRef = collection(db, 'maintenanceReports');

  async getDowntimeTrends() {
    const snapshot = await getDocs(this.reportRef);
    const data = snapshot.docs.map((doc) => doc.data());

    const dateMap = new Map<string, number>();

    data.forEach((r: any) => {
      const date = new Date(r.timestamp).toISOString().slice(0, 10);
      dateMap.set(date, (dateMap.get(date) || 0) + 1); // each report = 1 hr for simplicity
    });

    return [
      {
        name: 'Downtime',
        series: Array.from(dateMap.entries()).map(([date, value]) => ({
          name: date,
          value,
        })),
      },
    ];
  }

  async getMonthlyCostSummary(): Promise<{ [month: string]: number }> {
    const snapshot = await getDocs(this.reportRef);
    const data = snapshot.docs.map((doc) => doc.data());

    const costMap: { [month: string]: number } = {};
    data.forEach((r: any) => {
      const date = new Date(r.timestamp);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      costMap[key] = (costMap[key] || 0) + (r.cost || 100); // fallback to $100 if cost missing
    });

    return costMap;
  }

  async getEfficiencyRating(): Promise<number> {
    const snapshot = await getDocs(this.reportRef);
    const total = snapshot.size;
    const closed = snapshot.docs.filter((doc) => doc.data().status === 'closed').length;
    return total ? Math.round((closed / total) * 100) : 0;
  }
}
