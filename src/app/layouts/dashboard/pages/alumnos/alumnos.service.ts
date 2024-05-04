import { Injectable } from '@angular/core';
import { IStudent } from './models';
import { Observable, filter, first, map, of } from 'rxjs';
import { ObserversModule } from '@angular/cdk/observers';

let STUDENTS_DB: IStudent[] = [
  {
    id: 1,
    firstName: 'Tony',
    lastName: 'Soprano',
    email: 'tony.soprano@newjersey.com',
    anoIngreso: 2020,
    courses: [
      {
        code: 1,
        name: 'Angular',
        startDate: new Date(),
        durationMonths: 6,
        instructor: 'Josue Baez',
      },
      {
        code: 3,
        name: 'React',
        startDate: new Date(),
        durationMonths: 5,
        instructor: 'Ana García',  
      }
    ]
  },
  {
    id: 2,
    firstName: 'Carmela',
    lastName: 'Soprano',
    email: 'carmela.soprano@newjersey.com',
    anoIngreso: 2021,
    courses: [
      {
        code: 2,
        name: 'Python',
        startDate: new Date(),
        durationMonths: 4,
        instructor: 'Mauricio Cuello',
      },
    ]
  },
  {
    id: 3,
    firstName: 'Christopher',
    lastName: 'Moltisanti',
    email: 'christopher.moltisanti@newjersey.com',
    anoIngreso: 2022,
    courses: [
      {
        code: 3,
        name: 'React',
        startDate: new Date(),
        durationMonths: 5,
        instructor: 'Ana García',  
      }
    ]
  },
  {
    id: 4,
    firstName: 'Paulie',
    lastName: 'Gualtieri',
    email: 'paulie.gualtieri@newjersey.com',
    anoIngreso: 2019,
    courses: [
      {
        code: 4,
        name: 'SQL y Bases de Datos',
        startDate: new Date(),
        durationMonths: 7,
        instructor: 'María Rodríguez',
      }
    ]
  },
  {
    id: 5,
    firstName: 'Silvio',
    lastName: 'Dante',
    email: 'silvio.dante@newjersey.com',
    anoIngreso: 2021,
    courses: [
      {
        code: 1,
        name: 'Angular',
        startDate: new Date(),
        durationMonths: 6,
        instructor: 'Josue Baez',
      },
    ]
  },

]

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  getAlumnos(): Observable<IStudent[]> {
    return of(STUDENTS_DB);
  }

  getAlumnosById(id: number):Observable<IStudent | undefined> {
    return of(STUDENTS_DB.find((student)=> student.id === id));
  }

  constructor() {}
}
