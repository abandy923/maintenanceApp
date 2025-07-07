import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [IonicModule],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Analytics</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h2>Maintenance Analytics (Coming Soon)</h2>
      <p>This page will display predictive analytics and reports.</p>
    </ion-content>
  `,
})
export class AnalyticsPage {}
