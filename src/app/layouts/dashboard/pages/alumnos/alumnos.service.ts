import { Injectable } from '@angular/core';
import { IStudent } from './models';
import { Observable } from 'rxjs';
import { ObserversModule } from '@angular/cdk/observers';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  getAlumnos(): Observable<IStudent[]> {
    return new Observable<IStudent[]>((observer) => {
      const alumnosData: IStudent[] = [
        {
          id: 1,
          firstName: 'Tony',
          lastName: 'Soprano',
          email: 'tony.soprano@newyork.com',
          anoIngreso: 2020,
        },
        {
          id: 2,
          firstName: 'Carmela',
          lastName: 'Soprano',
          email: 'carmela.soprano@newyork.com',
          anoIngreso: 2021,
        },
        {
          id: 3,
          firstName: 'Christopher',
          lastName: 'Moltisanti',
          email: 'christopher.moltisanti@newyork.com',
          anoIngreso: 2022,
        },
        {
          id: 4,
          firstName: 'Paulie',
          lastName: 'Gualtieri',
          email: 'paulie.gualtieri@newyork.com',
          anoIngreso: 2019,
        },
        {
          id: 5,
          firstName: 'Silvio',
          lastName: 'Dante',
          email: 'silvio.dante@newyork.com',
          anoIngreso: 2021,
        },
        {
          id: 6,
          firstName: 'Jennifer',
          lastName: 'Melfi',
          email: 'jennifer.melfi@newyork.com',
          anoIngreso: 2023,
        },
        {
          id: 7,
          firstName: 'Corrado',
          lastName: 'Soprano',
          email: 'junior.soprano@newyork.com',
          anoIngreso: 2019,
        },
        {
          id: 8,
          firstName: 'Meadow',
          lastName: 'Soprano',
          email: 'meadow.soprano@newyork.com',
          anoIngreso: 2023,
        },
        {
          id: 9,
          firstName: 'Anthony Jr.',
          lastName: 'Soprano',
          email: 'aj.soprano@newyork.com',
          anoIngreso: 2024,
        },
        {
          id: 10,
          firstName: 'Adriana',
          lastName: 'La Cerva',
          email: 'adriana.lacerva@newyork.com',
          anoIngreso: 2022,
        },
      ];
      observer.next(alumnosData);
      observer.complete();
    });
  }

  constructor() {}
}
