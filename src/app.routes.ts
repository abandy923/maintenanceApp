import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import {authGuard} from './app/guards/auth.guard';

// TODO: Replace with your actual screen imports
export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./app/screens/login/login.component').then((m) => m.LoginComponent),
  },
  {
  path: 'signup',
  loadComponent: () =>
    import('./app/screens/signup/signup.component').then(
      m => m.SignupComponent
    ),
},
  {
  path: 'select-role',
  loadComponent: () =>
    import('./app/screens/role-selection/role-selection.component').then(
      m => m.RoleSelectionComponent
    ),
    canActivate: [authGuard],
},
  {
    path: 'dashboard/operator',
    loadComponent: () =>
      import('./app/screens/dashboard/operator-dashboard.component').then(
        (m) => m.OperatorDashboardComponent
      ),
      canActivate: [authGuard],
  },
  {
    path: 'dashboard/technician',
    loadComponent: () =>
      import('./app/screens/dashboard/technician-dashboard.component').then(
        (m) => m.TechnicianDashboardComponent
      ),
      canActivate: [authGuard],
  },
  {
  path: 'submit-report',
  loadComponent: () =>
    import('./app/screens/submit-report/submit-report.component').then(
      m => m.SubmitReportComponent
    ),
  canActivate: [authGuard],
},

  {
    path: 'dashboard/manager',
    loadComponent: () =>
      import('./app/screens/dashboard/manager-dashboard.component').then(
        (m) => m.ManagerDashboardComponent
      ),
      canActivate: [authGuard],
  },

  {
    path: '**',
    redirectTo: '',
  },
];



