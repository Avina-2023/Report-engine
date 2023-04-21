import { Routes, RouterModule } from '@angular/router';
import { LoginGaurd } from 'src/app/gaurds/loginGaurd';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { AddUserComponent } from './addUser/addUser.component';
import { AdminSettingsComponent } from './adminSettings.component';

const routes: Routes = [
  {
    path: `${APP_CONSTANTS.ROUTES.ADMIN.ADDUSER}`,
    component: AddUserComponent,
    // children: [
    //   {
    //     path: `${APP_CONSTANTS.ROUTES.ADMIN.ADDUSER}`,
    //     component: AddUserComponent,
    //   },
    // ],
  },
];

export const AdminSettingsRoutes = RouterModule.forChild(routes);
