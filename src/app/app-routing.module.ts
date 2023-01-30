import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { APP_CONSTANTS } from './utils/app-constants.service';
const routes: Routes = [
  {
    path: `${APP_CONSTANTS.ROUTES.LOGIN}`, component: LoginComponent,// canActivate: [IsloggedInGuard]
  },
  {
    path: `${APP_CONSTANTS.ROUTES.DASHBOARD}`, component: DashboardComponent,// canActivate: [IsloggedInGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,// canActivate: [IsloggedInGuard]
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
