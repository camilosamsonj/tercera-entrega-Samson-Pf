import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students/students.service';
import { CoursesService } from '../courses/courses.service';
import { EnrollmentService } from './enrollment.service';
import swal from 'sweetalert2/dist/sweetalert2.js'
import { IStudent } from '../students/models';
import { ICourse } from '../courses/models';
import { map } from 'rxjs';


@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.scss']
})
export class EnrollmentComponent implements OnInit{


  students: IStudent[] = [];
  courses: ICourse[] = [];
  studentId: string = '';
  courseId:string = '';

  // selectedStudentId:string = '';
  // selectedCourseId: string = '';

  constructor( private enrollmentService: EnrollmentService,
    private studentsService: StudentsService,
    private coursesService: CoursesService
   ) {}
  ngOnInit(): void {
    this.studentsService.getStudents().subscribe(students => {
      this.students = students;
    });
    this.coursesService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  enrollStudent(): void {
      this.studentsService.getStudentById(this.studentId)
      .pipe(
        map((student: IStudent) => {
          const {courses, ...modifiedStudent} = student;
          return modifiedStudent;
        })
      )
      .subscribe((modifiedStudent: IStudent) => {
        const selectedStudent: IStudent = modifiedStudent;       
        this.coursesService.getCourseById(this.courseId).subscribe((course: ICourse) => {
          const selectedCourse: ICourse = course;
          
          this.enrollmentService.enrollStudentInCourse(this.studentId, selectedCourse).subscribe( {
            next: (enrollmentResponse) => {
              console.log(enrollmentResponse);

              this.enrollmentService.addStudentsToCourse(this.courseId, selectedStudent).subscribe({
                next: (addresponse) => {
                  console.log(addresponse);
                },
                error: (error) => {
                  console.log('Error al agregar el estudiante a cursos: ', error);
                }
              })     
            },
            error: (error) => {
              console.log('Error', error);
              swal.fire({
                title: 'Error',
                text: error.error,
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
              });
            },
            complete: () => {
              swal.fire({
                title: 'Enrollment Successful',
                text: 'The student has been enrolled in the course.',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
              });
            }
          },
         )
        })
      })   
}





}


// unenrollStudent(): void {
//   this.enrollmentService.removeCourseFromStudent(this.courseId, this.studentId).subscribe({
//     next: (course: ICourse) => {
//       console.log('Curso actualizado luego de la desinscripción', course);
//       this.enrollmentService.unenrollStudentFromCourse(this.studentId, this.courseId).
//      subscribe({
//         next: (student: IStudent) => {
//           console.log('Estudiante actualizado después de desinscripción', student);
//         }
//       })
//     }
//   })
// }