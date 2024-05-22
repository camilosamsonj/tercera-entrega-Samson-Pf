import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
