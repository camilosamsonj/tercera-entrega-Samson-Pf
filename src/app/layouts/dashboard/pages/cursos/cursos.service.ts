import { Injectable } from '@angular/core';
import { ICourses } from './models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

 getCoursesObservable(): Observable<ICourses[]> {

  return new Observable<ICourses[]>((observer) => {
    const coursesData: ICourses[] = [
      {
        code: 1,
        name: 'Angular',
        startDate: new Date(),
        durationMonths: 6,
        instructor: 'Josue Baez',
      },
      {
        code: 2,
        name: 'Python',
        startDate: new Date(),
        durationMonths: 4,
        instructor: 'Mauricio Cuello',
      },
      {
        code: 3,
        name: 'React',
        startDate: new Date(),
        durationMonths: 5,
        instructor: 'Ana García',
      },
      {
        code: 4,
        name: 'SQL y Bases de Datos',
        startDate: new Date(),
        durationMonths: 7,
        instructor: 'María Rodríguez',
      },
    ];
    observer.next(coursesData);
    observer.complete();
  });
 }


getCoursesPromise(): Promise<ICourses[]> {

  return new Promise((resolve, reject) => {
    const coursesData: ICourses[] = [
      {
        code: 1,
        name: 'Angular',
        startDate: new Date(),
        durationMonths: 6,
        instructor: 'Josue Baez',
      },
      {
        code: 2,
        name: 'Python',
        startDate: new Date(),
        durationMonths: 4,
        instructor: 'Mauricio Cuello',
      },
      {
        code: 3,
        name: 'React',
        startDate: new Date(),
        durationMonths: 5,
        instructor: 'Ana García',
      },
      {
        code: 4,
        name: 'SQL y Bases de Datos',
        startDate: new Date(),
        durationMonths: 7,
        instructor: 'María Rodríguez',
      },   
    ];
    resolve(coursesData);
  });

  }

}