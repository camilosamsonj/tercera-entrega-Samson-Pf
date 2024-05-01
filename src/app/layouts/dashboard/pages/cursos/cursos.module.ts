import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CursosComponent } from './cursos.component';
import { CursosRoutingModule } from './cursos-routing.module';




@NgModule({
  declarations: [CursosComponent],
  imports: [
    CommonModule,
    SharedModule,
    CursosRoutingModule,
  ],
  exports: [
    CursosComponent,
  ]
})
export class CursosModule { }

