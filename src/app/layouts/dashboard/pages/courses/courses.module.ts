import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module'; 
import { CoursesComponent } from './courses.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CursosDialogComponent } from './components/cursos-dialog/cursos-dialog.component';


@NgModule({
  declarations: [CoursesComponent, CursosDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoursesRoutingModule,

  ],
  exports: [
    CoursesComponent,
  ]
})
export class CoursesModule { }

