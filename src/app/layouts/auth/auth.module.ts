import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';




@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AuthModule { }
