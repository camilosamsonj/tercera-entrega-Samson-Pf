import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICourses } from './models';
import { CursosService } from './cursos.service';
import { Observable, Observer, Subscription, catchError, of } from 'rxjs';
import { map } from 'rxjs';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'id',
    'name',
    'startDate',
    'durationMonths',
    'instructor',
    'actions',
  ];

  coursesFromPromise: ICourses[] = [];
  coursesFromObservable$: Observable<ICourses[]> | null = null;
  coursesToShow$: Observable<ICourses[]> | null = null;
  coursesSubscription: Subscription | null = null;
  isPromiseData: boolean = false;

  constructor(private coursesService: CursosService) {}

  ngOnInit(): void {
    if (!this.coursesFromObservable$) {
      this.getCoursesFromObservable();
    }
  }


// DES SUSCRIPCIÓN DEL OBSERVABLE EN EL ONDESTROY 

  ngOnDestroy(): void {
    if (this.coursesSubscription) {
      this.coursesSubscription.unsubscribe();
    }
  }


  // MÉTODO PARA OBTENER LOS DATOS DESDE LA PROMESA DEFINIDA EN EL SERVICIO COURSES SERVICE

  getCoursesFromPromise(): void {
    console.log('Se están cargando los datos desde la promesa');
    this.isPromiseData = true;
    this.coursesFromObservable$ = null;
    this.coursesService
      .getCoursesPromise()
      .then((courses) => {
        this.coursesFromPromise = courses;
        // SE CONVIERTEN LOS DATOS PARA SER MANEJADOS COMO UN OBSERVABLE Y APLICAR EL OPERADOR MAP DE RXJS
        this.coursesToShow$ = of(this.coursesFromPromise).pipe(
          map((courses: ICourses[]) => {
            return courses.map((course) => {
              return {
                ...course,
                id: course.code,
                duration: course.durationMonths,
                start: course.startDate,
              };
            });
          })
        );
      })
      .catch((error) => {
        console.error('Error al obtener los datos de los cursos: ', error);
      });
  }

  // MÉTODO PARA CONSUMIR LOS DATOS DESDE EL OBSERVABLE DEFINIDO EL SERVICIO COURSES SERVICE

  getCoursesFromObservable(): void {
    console.log('Se están cargando los datos desde el observable');
    this.isPromiseData = false;
    this.coursesFromPromise = [];
    // SE APLICA OPERADOR MAP DE RXJS PARA TRANSFORMAR LA PROPIEDAD 'code' EN 'id', LA PROPIEDAD 'durationMonths' EN 'duration'
    // Y LA PROPIEDAD 'startDate' en 'start' y así son mostradas en el cursos.component.html  
    this.coursesFromObservable$ = this.coursesService
      .getCoursesObservable()
      .pipe(
        map((courses: ICourses[]) => {
          return courses.map((course) => {
            return {
              ...course,
              id: course.code,
              duration: course.durationMonths,
              start: course.startDate,
            };
          });
        })
      );
    this.coursesToShow$ = this.isPromiseData
      ? of(this.coursesFromPromise)
      : this.coursesFromObservable$;
    this.coursesSubscription = this.coursesFromObservable$.subscribe();
  }

}
