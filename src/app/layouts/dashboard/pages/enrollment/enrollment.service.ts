import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment'
import { catchError, map, pluck, switchMap, tap } from 'rxjs/operators';
import { IStudent } from '../students/models';
import { ICourse } from '../courses/models';
import { StudentsService } from '../students/students.service';
import { CoursesService } from '../courses/courses.service';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  apiURL = environment.baseAPIURL;

  constructor(private httpClient: HttpClient,
    private studentsService: StudentsService,
    private coursesService: CoursesService
  ) { }

  enrollStudentInCourse(studentId: string, course: ICourse): Observable<IStudent> {
   return this.httpClient.get<IStudent>(`${this.apiURL}/students/${studentId}`).pipe(
    catchError((error)=> {
      console.log(error);
      return throwError(() => new Error('Error al obtener el estudiante'));
    }), 
    switchMap((student: IStudent) => {
      if(!student.courses) {
        student.courses = []
      }
      student.courses.push(course);
      return this.httpClient.put<IStudent>(`${this.apiURL}/students/${studentId}`, student).pipe(
        catchError((error) => {
          console.log(error);
          return throwError(() => new Error('Error'));
        }),
        tap(() => {
          console.log('Estudiante actualizado con el nuevo curso', student);
        })
      )
    }),   
)}



    addStudentsToCourse(courseId: string, student: IStudent): Observable<ICourse> {
      return this.httpClient.get<ICourse>(`${this.apiURL}/courses/${courseId}`).pipe(
        catchError((error) => {
          console.log(error);
          return throwError(() => new Error('Error al obtener el curso'));
        }),
        switchMap((course: ICourse) => {
          if(!course.students) {
            course.students = []
          }
          course.students.push(student);
          return this.httpClient.put<ICourse>(`${this.apiURL}/courses/${courseId}`, course).pipe(
            catchError((error) => {
              console.log(error);
              return throwError(() => new Error('Error'));
            }),
            tap(() => {
              console.log('Curso actualizado con el nuevo estudiante');
            })
          )
          
        })
      );
    }
  

    // unenrollStudentFromCourse( studentId: string, courseId: string): Observable<IStudent> {
    //       return this.httpClient.get<IStudent>(`${this.apiURL}/students/${studentId}`).pipe(catchError((error) => {
    //         return throwError(() => new Error(error));
    //       }),
    //     switchMap((student: IStudent) => {
    //       if(student.courses && student.courses.length > 0) {
    //         student.courses = student.courses.filter(course => course.id.toString() !== courseId);
    //       } else {
    //         console.warn('El estudiante no tiene cursos inscritos')
    //       }

    //       return this.httpClient.put<IStudent>(`${this.apiURL}/students/${studentId}`, student).pipe(
    //         catchError((error) => {
    //           console.error('Error al actualizar el estudiante', error);
    //           return throwError(() => new Error(error));
    //       }),
    //     tap(() => {
    //       console.log('Estudiante actualizado luego de desinscripción')
    //     }));
    //     }))
    // }

    
    // removeCourseFromStudent(studentId: string, courseId: string): [Observable<ICourse> | Observable<IStudent>]{
    //   return this.httpClient.get<IStudent>(`${this.apiURL}/students/${studentId}`).pipe(
    //     switchMap((student: IStudent) => {
    //       if(student.courses && student.courses.length > 0) {
    //         student.courses.find(course => course.id.toString() === courseId);
             
    //       }
          
    //     })
    //   )

        



    //     ,switchMap((course: ICourse) => {
    //       if(course.students && course.students.length > 0) {
    //         course.students.find(student => student.id.toString() === studentId);
            
    //       } else {
    //         console.warn('El curso no tiene estudiantes inscritos');
    //       }
    //       return this.httpClient.put<ICourse>(`${this.apiURL}/courses/${courseId}`, course).pipe(
    //         catchError((error) => {
    //           console.error('Error al actualizar el curso', error);
    //           return throwError(() => new Error(error));
    //         }),
    //         tap(()=> {
    //           console.log('Curso actualizado');
    //         })
    //       )
    //     })
    //   )
    // }




    // unenrollStudentFromCourse(studentId: string, courseId: string): Observable<ICourse> {
    //   return this.httpClient.get<ICourse>(`${this.apiURL}/courses/${courseId}`).
    //   pipe(
    //     switchMap((course: ICourse) => {
    //       if(course.students) {
    //         const student = course.students.find(s => s.id.toString() === studentId);
    //         if(student) {
    //           course.students = course.students.filter(s => s !== student);
    //         }
    //       }
    //       return this.httpClient.delete<ICourse>(`${this.apiURL}/courses/${courseId}`).pipe(
    //         catchError((error) => {
    //           return throwError(() => new Error(error));
    //         })
    //       )
    //     })
    //   )    
    // }



}
