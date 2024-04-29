import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CursosComponent } from './cursos.component';




@NgModule({
  declarations: [CursosComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CursosComponent,
  ]
})
export class CursosModule { }
