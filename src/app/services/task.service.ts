import { Injectable } from '@angular/core';
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase-config';

export interface Task {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  notes: string;
  assignedTo: string;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private taskRef = collection(db, 'tasks');

  // Real-time task listener for a user
  subscribeToTasks(
    userId: string,
    callback: (tasks: Task[]) => void
  ): () => void {
    const q = query(this.taskRef, where('assignedTo', '==', userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Task, 'id'>),
      }));
      callback(tasks);
    });
    return unsubscribe;
  }

  async updateTaskStatus(taskId: string, status: Task['status']) {
    const taskDoc = doc(db, 'tasks', taskId);
    await updateDoc(taskDoc, { status });
  }
}

