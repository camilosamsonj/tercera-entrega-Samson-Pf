import { Component, OnInit } from '@angular/core';
import { Observable, Observer, of, take, map, delay } from 'rxjs';
import { ICourse } from '../cursos/models';
import { CursosService } from '../cursos/cursos.service';
import { AlumnosService } from '../alumnos/alumnos.service';
import { IStudent } from '../alumnos/models';
import { InscripcionesService } from './inscripciones.service';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent implements OnInit {

cursos$: Observable<ICourse[]> = of([]);
alumnos$: Observable<IStudent[]> = of([]);

cursoSeleccionadoId: number | undefined;
alumnoSeleccionadoId: number | undefined;

displayedColumns: string[] = [
  'ID Curso',
  'ID Alumno',
  ''
]

constructor(
  private inscripcionesService: InscripcionesService
) {}

  ngOnInit(): void {
    this.cursos$ = this.inscripcionesService.getCourses();
    this.alumnos$ = this.inscripcionesService.getStudents(); 
  }


  inscribirAlumno():void{
    if(this.cursoSeleccionadoId && this.alumnoSeleccionadoId) {
      this.inscripcionesService.inscribirAlumno(this.alumnoSeleccionadoId, this.cursoSeleccionadoId);
    }
  }


}
