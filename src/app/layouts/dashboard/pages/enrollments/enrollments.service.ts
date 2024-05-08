import { Injectable } from '@angular/core';
import { StudentsService } from '../students/students.service';
import { CoursesService } from '../courses/courses.service';
import { IEnrollment } from './models';
import { ICourse } from '../courses/models';
import { IStudent } from '../students/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {

inscripciones: IEnrollment[] = [];

  constructor(private cursosService: CoursesService,
    private studentsService: StudentsService
  ) { }

  getCourses(): Observable<ICourse[]> {
    return this.cursosService.getCourses();   
  }

  getStudents(): Observable<IStudent[]> {
    return this.studentsService.getStudents();
  }
 

  inscribirAlumno(alumnoId: number, cursoId: number): void {
    const inscripcion: IEnrollment = {
      alumnoId: alumnoId,
      cursoId: cursoId,
      fechaInscripcion: new Date()
      
    };this.inscripciones.push(inscripcion);
  }

  getInscripciones(): IEnrollment[] {
    return this.inscripciones;
  }

  getInscripcionesPorAlumno(alumnoId: number): IEnrollment[]{
    return this.inscripciones.filter(inscripcion => inscripcion.alumnoId === alumnoId);
  }

  getInscripcionesPorCurso(cursoId: number): IEnrollment[] {
    return this.inscripciones.filter(inscripcion => inscripcion.cursoId === cursoId);
  }

  }
