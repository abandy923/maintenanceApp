import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogService, EquipmentLog } from '../../services/log.service';

@Component({
  selector: 'app-equipment-logs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <h2>Equipment Logs</h2>

      <label>
        Search:
        <input [(ngModel)]="searchText" (input)="loadLogs()" placeholder="Search by equipment or issue" />
      </label>

      <label>
        Filter Status:
        <select [(ngModel)]="statusFilter" (change)="loadLogs()">
          <option value="">All</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </label>

      <div *ngFor="let log of logs" class="log-card">
        <h3>{{ log.equipment }}</h3>
        <p>{{ log.issue }}</p>
        <p>Status: {{ log.status }} | Date: {{ log.date }}</p>
      </div>
    </div>
  `,
  styles: [`
    .log-card {
      border: 1px solid #ccc;
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 8px;
    }
  `],
})
export class EquipmentLogsComponent implements OnInit {
  searchText = '';
  statusFilter = '';
  logs: EquipmentLog[] = [];

  constructor(private logService: LogService) {}

  ngOnInit() {
    this.loadLogs();
  }

  async loadLogs() {
    this.logs = await this.logService.getLogsFiltered(this.searchText, this.statusFilter);
  }
}

