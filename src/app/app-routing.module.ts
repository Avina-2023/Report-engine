import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { APP_CONSTANTS } from './utils/app-constants.service';
import { LoginGaurd } from "./gaurds/loginGaurd";
import { Reverseauth } from './gaurds/reverseauth';
import { ExamStatusReportComponent } from './pages/examStatusReport/examStatusReport.component';
const routes: Routes = [
  {
    path: `${APP_CONSTANTS.ROUTES.LOGIN}`, component: LoginComponent,canActivate: [Reverseauth]
  },
  {
    path: `${APP_CONSTANTS.ROUTES.DASHBOARD}`, component: DashboardComponent,canActivate: [LoginGaurd]
  },
  {
    path:  `exam`, component: ExamStatusReportComponent
  },
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
