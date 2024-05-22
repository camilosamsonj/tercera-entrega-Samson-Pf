import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './layouts/dashboard/dashboard.module';
import { AuthModule } from './layouts/auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [ 
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    DashboardModule,
    AuthModule,
    HttpClientModule,
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
