import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { APP_CONSTANTS } from './utils/app-constants.service';
import { LoginGaurd } from "./gaurds/loginGaurd";
import { Reverseauth } from './gaurds/reverseauth';



const routes: Routes = [
  {
    path: `${APP_CONSTANTS.ROUTES.LOGIN}`, loadComponent:()=> import('./pages/login/login.component').then(comp=>comp.LoginComponent),canActivate: [Reverseauth]
  },
  {
    path: `${APP_CONSTANTS.ROUTES.DASHBOARD}`, loadComponent:() => import('./pages/dashboard/dashboard.component').then(comp=>comp.DashboardComponent),canActivate: [LoginGaurd]
  },
  {
    path:  `${APP_CONSTANTS.ROUTES.EXAM}`, loadComponent:() => import('./pages/examStatusReport/examStatusReport.component').then(comp=>comp.ExamStatusReportComponent),canActivate:[LoginGaurd]
  },
  {
    path:  `${APP_CONSTANTS.ROUTES.PROCTOR}`, loadComponent:() => import('./pages/proctor/proctor.component').then(comp=>comp.ProctorComponent),canActivate:[LoginGaurd]
  },
  {
    path:  `${APP_CONSTANTS.ROUTES.VMSSDASH}`, loadComponent:()=> import('./pages/dashboard_VMSS/dashboard_VMSS.component').then(comp=>comp.Dashboard_VMSSComponent),canActivate:[LoginGaurd]
  },
  {
    path: `${APP_CONSTANTS.ROUTES.ADMIN.HOME}`,loadComponent: () => import('./pages/adminSettings/addUser/addUser.component').then(comp=>comp.AddUserComponent),canActivate:[LoginGaurd]
  },
  // {
  //   path:  `${APP_CONSTANTS.ROUTES.ADMIN.ADDUSER}`, component: AddUserComponent
  // },
  {
    path: '',
    pathMatch: 'full',
    loadComponent: ()=>import('./pages/login/login.component').then(comp=>comp.LoginComponent), canActivate: [Reverseauth]
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
