import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentComponent } from './enrollment.component';
import { SharedModule } from '../../../../shared/shared.module';
import { EnrollmentRoutingModule } from './enrollment-routing.module';



@NgModule({
  declarations: [
    EnrollmentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EnrollmentRoutingModule,
  ]
})
export class EnrollmentModule { }
