import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';

@Injectable({ providedIn: 'root' })
export class MaintenanceService {
  constructor(private firestore: Firestore) {}

  async submitIssue(data: { machineId: string; description: string; imageData?: string | null }) {
    let imageUrl: string | null = null;

    if (data.imageData) {
      const fileName = `issue_${Date.now()}.jpg`;
      const storage = getStorage();
      const storageRef = ref(storage, 'issues/' + fileName);
      await uploadString(storageRef, data.imageData, 'data_url');
      imageUrl = await getDownloadURL(storageRef);
    }

    const issuesRef = collection(this.firestore, 'maintenanceRequests');
    return addDoc(issuesRef, {
      machineId: data.machineId,
      description: data.description,
      imageUrl,
      timestamp: Date.now()
    });
  }
}

