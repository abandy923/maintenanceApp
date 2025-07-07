import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-offline-sync',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .sync-toast {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #444;
      color: #fff;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.2);
      animation: fadeInOut 5s ease-in-out;
    }
    @keyframes fadeInOut {
      0% { opacity: 0; transform: translateY(20px); }
      10% { opacity: 1; transform: translateY(0); }
      90% { opacity: 1; }
      100% { opacity: 0; transform: translateY(20px); }
    }
  `],
  template: `
    <div *ngIf="show" class="sync-toast">
      🔄 Syncing data with server...
    </div>
  `
})
export class OfflineSyncComponent implements OnInit {
  show = false;

  ngOnInit() {
    window.addEventListener('online', () => this.triggerSync());
  }

  triggerSync() {
    this.show = true;
    setTimeout(() => this.show = false, 5000);
  }
}
