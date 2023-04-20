import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { APP_CONSTANTS } from './utils/app-constants.service';
import { LoginGaurd } from "./gaurds/loginGaurd";
import { Reverseauth } from './gaurds/reverseauth';
import { PrevilegeGaurd } from './gaurds/previlegeGaurd';
import { ExamStatusReportComponent } from './pages/examStatusReport/examStatusReport.component';
import { AddUserComponent } from './pages/adminSettings/addUser/addUser.component';
import { ProctorComponent } from './pages/proctor/proctor.component'
import { Dashboard_VMSSComponent } from './pages/dashboard_VMSS/dashboard_VMSS.component';


const routes: Routes = [
  {
    path: `${APP_CONSTANTS.ROUTES.LOGIN}`, component: LoginComponent,canActivate: [Reverseauth]
  },
  {
    path: `${APP_CONSTANTS.ROUTES.DASHBOARD}`, component: DashboardComponent,canActivate: [LoginGaurd]
  },
  {
    path:  `${APP_CONSTANTS.ROUTES.EXAM}`, component: ExamStatusReportComponent,canActivate:[PrevilegeGaurd]
  },
  {
    path:  `${APP_CONSTANTS.ROUTES.PROCTOR}`, component: ProctorComponent,canActivate:[LoginGaurd]
  },
  {
    path:  `${APP_CONSTANTS.ROUTES.VMSSDASH}`, component: Dashboard_VMSSComponent,canActivate:[LoginGaurd]
  },
  {
    path: `${APP_CONSTANTS.ROUTES.ADMIN.HOME}`,canActivate:[PrevilegeGaurd],
    loadChildren: () => import('./pages/adminSettings/adminSettings.module').then(m => m.AdminSettingsModule)
  },
  // {
  //   path:  `${APP_CONSTANTS.ROUTES.ADMIN.ADDUSER}`, component: AddUserComponent
  // },
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,canActivate: [Reverseauth]
  },
  {
    path: `error`,
    pathMatch: 'full',
    component: PagenotfoundComponent
  },
  {
    path: `**`,
    pathMatch: 'full',
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
