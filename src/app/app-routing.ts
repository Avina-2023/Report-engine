import { Routes } from '@angular/router';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { APP_CONSTANTS } from './utils/app-constants.service';
// import { LoginGaurd } from "./gaurds/loginGaurd";
// import { Reverseauth } from './gaurds/reverseauth';
import { loginGaurd, roleGuard, rootGaurd } from './gaurds/auth.guard';




export const routes: Routes = [
  {
    path: `${APP_CONSTANTS.ROUTES.LOGIN}`, loadComponent:()=> import('./pages/login/login.component').then(comp=>comp.LoginComponent),canActivate: [rootGaurd]
  },
  {
    path: `${APP_CONSTANTS.ROUTES.DASHBOARD}`, loadComponent:() => import('./pages/dashboard/dashboard.component').then(comp=>comp.DashboardComponent),canActivate: [loginGaurd],data:{role:"CC"}
  },
  {
    path:  `${APP_CONSTANTS.ROUTES.EXAM}`, loadComponent:() => import('./pages/examStatusReport/examStatusReport.component').then(comp=>comp.ExamStatusReportComponent),canActivate:[loginGaurd]
  },
  {
    path:  `${APP_CONSTANTS.ROUTES.PROCTOR}`, loadComponent:() => import('./pages/proctor/proctor.component').then(comp=>comp.ProctorComponent),canActivate:[roleGuard],data:{role:"SADM"}
  },
  {
    path:  `${APP_CONSTANTS.ROUTES.ACTIONCENTER}`, loadComponent:() => import('./pages/actionCenter/actionCenter.component').then(comp=>comp.ActionCenterComponent),canActivate:[roleGuard],data:{role:"SADM"}
  },
  {
    path:  `${APP_CONSTANTS.ROUTES.USERDASHBOARD}`, loadComponent:() => import('./pages/userDashboard/userDashboard.component').then(comp=>comp.UserDashboardComponent),canActivate:[loginGaurd]
  },
  {
    path: `${APP_CONSTANTS.ROUTES.ANALYSIS}`,loadComponent: () => import('./pages/analysis/analysis.component').then(comp=>comp.AnalysisComponent),canActivate:[roleGuard],data:{role:"SADM"}
  },
  {
    path: `${APP_CONSTANTS.ROUTES.REGISTRATION}`,loadComponent: () => import('./pages/registration/registration.component').then(comp=>comp.RegistrationComponent),canActivate:[roleGuard],data:{role:"SADM"}
  },
  {
    path: `${APP_CONSTANTS.ROUTES.APILOGS}`,loadComponent: () => import('./pages/apiLogs/apiLogs.component').then(comp=>comp.ApiLogsComponent),canActivate:[roleGuard],data:{role:"SADM"}
  },
  // {
  //   path:  `${APP_CONSTANTS.ROUTES.VMSSDASH}`, loadComponent:()=> import('./pages/dashboard_VMSS/dashboard_VMSS.component').then(comp=>comp.Dashboard_VMSSComponent),canActivate:[loginGaurd]
  // },
  {
    path: `${APP_CONSTANTS.ROUTES.ADMIN.HOME}`,loadComponent: () => import('./pages/adminSettings/addUser/addUser.component').then(comp=>comp.AddUserComponent),canActivate:[roleGuard],data:{role:"SADM"}
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent: ()=>import('./pages/login/login.component').then(comp=>comp.LoginComponent), canActivate: [rootGaurd]
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

