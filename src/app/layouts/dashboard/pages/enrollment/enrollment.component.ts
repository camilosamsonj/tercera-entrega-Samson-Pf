import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students/students.service';
import { CoursesService } from '../courses/courses.service';
import { EnrollmentService } from './enrollment.service';
import swal from 'sweetalert2';
import { IStudent } from '../students/models';
import { ICourse } from '../courses/models';
import { EMPTY, Observable, catchError, map, switchMap, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
})

export class EnrollmentComponent implements OnInit {
  students: IStudent[] = [];
  courses: ICourse[] = [];
  studentId: string = '';
  courseId: string = '';
  unenrollStudentId: string = '';
  unenrollCourseId: string = '';
  loading: boolean = false;

  constructor(
    private enrollmentService: EnrollmentService,
    private studentsService: StudentsService,
    private coursesService: CoursesService
  ) { }

  

  ngOnInit(): void {
    this.loading = true;
    this.studentsService.getStudents()
    .subscribe({
      next: (students) => {
        this.students = students;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.loading = false;
      }
    });
    this.coursesService.getCourses()
    .subscribe({
      next: (courses: ICourse[]) => {
        this.courses = courses;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }


  enrollStudent(): void {
    this.studentsService.getStudentById(this.studentId).pipe(
      map((student: IStudent) => {
        const { courses, ...modifiedStudent } = student;
        return modifiedStudent;
      })
    ).subscribe((modifiedStudent: IStudent) => {
      const selectedStudent: IStudent = modifiedStudent;
      this.coursesService.getCourseById(this.courseId).pipe(
        map((course: ICourse) => {
          const { students, ...modifiedCourse } = course;
          return modifiedCourse;
        })
      ).subscribe((modifiedCourse: ICourse) => {
        const selectedCourse: ICourse = modifiedCourse;
        const studentIds = selectedCourse.students?.map((student) => student.id);
        if (!studentIds?.includes(parseInt(this.studentId))) {
          this.enrollmentService.enrollStudentInCourse(this.studentId, selectedCourse).subscribe({
            next: (enrollmentResponse) => {
              console.log(enrollmentResponse);
              this.enrollmentService.addStudentsToCourse(this.courseId, selectedStudent);
            },
            error: (error) => {
              console.log('Error', error);
              swal.fire({
                title: 'Error',
                text: error.error,
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            },
            complete: () => {
              swal.fire({
                title: 'Inscripción exitosa!',
                text: `El estudiante: ${modifiedStudent.firstName} ${modifiedStudent.lastName} fue inscrito correctamente en el curso: ${modifiedCourse.name}`,
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            },
          });
        } else {
          swal.fire({
            title: 'Error',
            text: 'El estudiante ya se encuentra inscrito en el curso',
            icon: 'error',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
      });
    });
  }

  

  unenrollStudent(): void {
    const student$: Observable<IStudent> = this.studentsService.getStudentById(this.unenrollStudentId);
    
    student$.pipe(
      switchMap((student: IStudent) => {
        return this.coursesService.getCourseById(this.unenrollCourseId).pipe(
          switchMap((course: ICourse) => {
            const courseIdsInStudents = student.courses?.map(cId => course.id);
            if (courseIdsInStudents?.includes(course.id)) {
              return this.enrollmentService.unenrollStudentFromCourse(this.unenrollStudentId, this.unenrollCourseId, student).pipe(
                tap((value: ICourse | null) => {
                  if (value !== null) {
                    swal.fire({
                      title: 'Desinscripción exitosa!',
                      text: `El estudiante ${student.firstName} ${student.lastName} desinscrito del curso ${course.name}`,
                      icon: 'success',
                      timer: 2000,
                      timerProgressBar: true,
                      showConfirmButton: false,
                    });
                  }
                }),
                switchMap(() => {
                  return this.enrollmentService.updateCourseAfterStudentRemoval(this.unenrollCourseId, this.unenrollStudentId)
                }),
                tap((updateResponse) => {
                  console.log('Curso actualizado luego de la desinscripción: ', updateResponse);
                }),
                catchError(error => {
                  console.error('Error al Actualizar curso: ', error);
                  return throwError(() => new Error('Error al actualizar curso: '));
                })
              );
            } else {
              swal.fire({
                title: 'Error',
                text: `El estudiante: ${student.firstName} ${student.lastName} no se encuentra inscrito en el curso: ${course.name}`,
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
              return EMPTY;
            }
          }),
          catchError(error => {
            console.error('Error al obtener el curso: ', error);
            return EMPTY;
          })
        );
      })
    ).subscribe();
  }

}










// enrollStudent(): void {
  //   this.studentsService
  //     .getStudentById(this.studentId)
  //     .pipe(
  //       map((student: IStudent) => {
  //         const { courses, ...modifiedStudent } = student;
  //         return modifiedStudent;
  //       })
  //     )
  //     .subscribe((modifiedStudent: IStudent) => {
  //       const selectedStudent: IStudent = modifiedStudent;
  //       this.coursesService
  //         .getCourseById(this.courseId).pipe(map((course: ICourse)=> {
  //           const {students, ...modifiedCourse} = course;
  //           return modifiedCourse;
  //         })
  //       )
  //         .subscribe((modifiedCourse: ICourse) => {
  //           const selectedCourse: ICourse = modifiedCourse;
  //           const studentIds = selectedCourse.students?.map(
  //             (student) => student.id
  //           );
  //           if (!studentIds?.toString().includes(this.studentId)) {
  //             this.enrollmentService
  //               .enrollStudentInCourse(this.studentId, selectedCourse)
  //               .subscribe({
  //                 next: (enrollmentResponse) => {
  //                   console.log(enrollmentResponse);
  //                   this.enrollmentService
  //                     .addStudentsToCourse(this.courseId, selectedStudent)
  //                     .subscribe({
  //                       next: (addresponse) => {
  //                         console.log(addresponse);
  //                       },
  //                       error: (error) => {
  //                         console.log(
  //                           'Error al agregar el estudiante a cursos: ',
  //                           error
  //                         );
  //                       },
  //                     });
  //                 },
  //                 error: (error) => {
  //                   console.log('Error', error);
  //                   swal.fire({
  //                     title: 'Error',
  //                     text: error.error,
  //                     icon: 'error',
  //                     timer: 2000,
  //                     timerProgressBar: true,
  //                     showConfirmButton: false,
  //                   });
  //                 },
  //                 complete: () => {
  //                   swal.fire({
  //                     title: 'Inscripción exitosa!',
  //                     text: `El estudiante: ${modifiedStudent.firstName} ${modifiedStudent.lastName} fue inscrito correctamente en el curso: ${modifiedCourse.name}`,
  //                     icon: 'success',
  //                     timer: 2000,
  //                     timerProgressBar: true,
  //                     showConfirmButton: false,
  //                   });
  //                 },
  //               });
  //           } else {
  //             swal.fire({
  //               title: 'Error',
  //               text: 'El estudiante ya se encuentra inscrito en el curso',
  //               icon: 'error',
  //               timer: 2000,
  //               timerProgressBar: true,
  //               showConfirmButton: false,
  //             });
  //           }
  //         });
  //     });
  // }


    // student$.subscribe({
    //   next: (student: IStudent) => {
    //     student;
    //     const course$: Observable<ICourse> = this.coursesService.getCourseById(this.unenrollCourseId)
    //     course$.subscribe({
    //       next: (course: ICourse) => {
    //         course;
    //         const courseIdsInStudents = student.courses?.map(cId => course.id)
    //         if(courseIdsInStudents?.includes(course.id)){
    //         this.enrollmentService
    //           .unenrollStudentFromCourse(
    //             this.unenrollStudentId,
    //             this.unenrollCourseId,
    //             student
    //           )
    //           .pipe(tap((value: ICourse | null) => {
    //             if(value !== null) {
    //               swal.fire({
    //                 title: 'Desinscripción exitosa!',
    //                 text: `El estudiante ${student.firstName} ${student.lastName} desinscrito del curso ${course.name}`,
    //                 icon: 'success',
    //                 timer: 2000,
    //                 timerProgressBar: true,
    //                 showConfirmButton: false,
    //               });
    //             }
    //           }  
    //           )).subscribe();
                  
    //               this.enrollmentService
    //                 .updateCourseAfterStudentRemoval(
    //                   this.unenrollCourseId,
    //                   this.unenrollStudentId
    //                 )
    //                 .subscribe({
    //                   next: (updateResponse) => {
    //                     console.log(
    //                       'Curso actualizado luego de la desinscripción: ',
    //                       updateResponse
    //                     );
    //                   },
    //                   error: (error) => {
    //                     console.log(
    //                       'Error al actualizar cursos luego de la desinscripción: ',
    //                       error
    //                     );
    //                   }
    //                 });
    //         } else {
    //           swal.fire({
    //             title: 'Error',
    //             text: `El estudiante: ${student.firstName} ${student.lastName} no se encuentra inscrito en el curso: ${course.name}`,
    //             icon: 'error',
    //             timer: 2000,
    //             timerProgressBar: true,
    //             showConfirmButton: false,
    //           });
    //           }
    //       },
    //     });
    //   },
    // });