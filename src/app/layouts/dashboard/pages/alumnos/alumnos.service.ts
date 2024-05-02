import { Injectable } from '@angular/core';
import { IStudent } from './models';
import { Observable, of } from 'rxjs';
import { ObserversModule } from '@angular/cdk/observers';

let STUDENTS_DB: IStudent[] = [
  {
    id: 1,
    firstName: 'Tony',
    lastName: 'Soprano',
    email: 'tony.soprano@newjersey.com',
    anoIngreso: 2020,
  },
  {
    id: 2,
    firstName: 'Carmela',
    lastName: 'Soprano',
    email: 'carmela.soprano@newjersey.com',
    anoIngreso: 2021,
  },
  {
    id: 3,
    firstName: 'Christopher',
    lastName: 'Moltisanti',
    email: 'christopher.moltisanti@newjersey.com',
    anoIngreso: 2022,
  },
  {
    id: 4,
    firstName: 'Paulie',
    lastName: 'Gualtieri',
    email: 'paulie.gualtieri@newjersey.com',
    anoIngreso: 2019,
  },
  {
    id: 5,
    firstName: 'Silvio',
    lastName: 'Dante',
    email: 'silvio.dante@newjersey.com',
    anoIngreso: 2021,
  },

]

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  getAlumnos(): Observable<IStudent[]> {
    return of(STUDENTS_DB);

  }

  constructor() {}
}
