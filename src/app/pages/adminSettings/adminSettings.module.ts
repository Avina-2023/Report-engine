import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSettingsComponent } from './adminSettings.component';
import { AddUserComponent } from './addUser/addUser.component';
import { AdminSettingsRoutes } from './adminSettings.routing';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AdminSettingsRoutes,
    NzSelectModule
  ],
  declarations: [AdminSettingsComponent,AddUserComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AdminSettingsModule { }
