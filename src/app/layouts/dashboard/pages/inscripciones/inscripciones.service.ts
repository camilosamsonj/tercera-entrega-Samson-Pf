import { Injectable } from '@angular/core';
import { AlumnosService } from '../alumnos/alumnos.service';
import { CursosService } from '../cursos/cursos.service';
import { IEnrollment } from './models';
import { ICourse } from '../cursos/models';
import { IStudent } from '../alumnos/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

inscripciones: IEnrollment[] = [];

  constructor(private alumnosService: AlumnosService,
    private cursosService: CursosService) { }

  getCourses(): Observable<ICourse[]> {
    return this.cursosService.getCourses();   
  }

  getStudents(): Observable<IStudent[]> {
    return this.alumnosService.getAlumnos();
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
