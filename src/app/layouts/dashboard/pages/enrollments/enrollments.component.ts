import { Component, OnInit } from '@angular/core';
import { Observable, Observer, of, take, map, delay } from 'rxjs';
import { ICourse } from '../courses/models';
import { IStudent } from '../students/models';
import { EnrollmentsService } from './enrollments.service';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
})
export class EnrollmentsComponent implements OnInit {

cursos$: Observable<ICourse[]> = of([]);
alumnos$: Observable<IStudent[]> = of([]);

cursoSeleccionadoId: number | undefined;
alumnoSeleccionadoId: number | undefined;


constructor(
  private enrollmentsService: EnrollmentsService
) {}

  ngOnInit(): void {
    this.cursos$ = this.enrollmentsService.getCourses();
    this.alumnos$ = this.enrollmentsService.getStudents(); 
  }


  inscribirAlumno():void{
    if(this.cursoSeleccionadoId && this.alumnoSeleccionadoId) {
      this.enrollmentsService.inscribirAlumno(this.alumnoSeleccionadoId, this.cursoSeleccionadoId);
    }
  }


}
