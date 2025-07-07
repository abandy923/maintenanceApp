import { Injectable } from '@angular/core';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../firebase-config';

export interface EquipmentLog {
  id: string;
  equipment: string;
  issue: string;
  date: string; // ISO date string
  status: 'open' | 'closed';
}

@Injectable({ providedIn: 'root' })
export class LogService {
  private logRef = collection(db, 'equipmentLogs');

  async getLogs(): Promise<EquipmentLog[]> {
    const snapshot = await getDocs(this.logRef);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<EquipmentLog, 'id'>),
    }));
  }

  async getLogsFiltered(search: string, status: string): Promise<EquipmentLog[]> {
    const snapshot = await getDocs(this.logRef);
    const allLogs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<EquipmentLog, 'id'>),
    }));

    return allLogs.filter((log) => {
      const matchText =
        (log.equipment + ' ' + log.issue).toLowerCase().includes(search.toLowerCase());
      const matchStatus = status ? log.status === status : true;
      return matchText && matchStatus;
    });
  }
}
