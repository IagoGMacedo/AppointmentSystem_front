import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './auth/login-register/login-register.component';
import { guestGuard } from './core/guards/guest.guard';
import { DefaultComponent } from './shared/layouts/default/default.component';
import { authGuard } from './core/guards/auth.guard';
import { MasterComponent } from './shared/layouts/master/master.component';
import { PatientHomePageComponent } from './pages/patient-home-page/patient-home-page.component';
import { ProfessionalHomePageComponent } from './pages/professional-home-page/professional-home-page.component';
import { rolePatientGuard } from './core/guards/role-patient.guard';
import { roleProfessionalGuard } from './core/guards/role-professional.guard';
export const routes: Routes = [
  {
    path: '',
    canActivate: [guestGuard],
    component: DefaultComponent,
    children: [{ path: '', component: LoginRegisterComponent }],
  },
  {
    path: '',
    canActivate: [authGuard],
    component: MasterComponent,
    children: [
      {
        path: 'professional',
        canActivate: [roleProfessionalGuard],
        component: ProfessionalHomePageComponent,
      },
      {
        path: 'patient',
        canActivate: [rolePatientGuard],
        component: PatientHomePageComponent,
      },
    ],
  },
];
