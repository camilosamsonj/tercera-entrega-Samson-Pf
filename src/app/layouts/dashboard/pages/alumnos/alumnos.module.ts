import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AlumnosComponent } from './alumnos.component';
import { AlumnosDialogComponent } from './components/alumnos-dialog/alumnos-dialog.component';
import {AlumnosRoutingModule} from './alumnos-routing.module';

@NgModule({
  declarations: [ AlumnosComponent, AlumnosDialogComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    AlumnosRoutingModule,
  ],
  exports: [AlumnosComponent],
})
export class AlumnosModule { }