import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICourse } from './models';
import { CoursesService } from './courses.service';
import { MatDialog } from '@angular/material/dialog';
import { CoursesDialogComponent} from '../courses/components/courses-dialog/courses-dialog.component'
import swal from 'sweetalert2';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { StudentsService } from '../students/students.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
})
export class CoursesComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'startDate',
    'durationMonths',
    'instructor',
    'actions',
  ];

  loading = false;
  courses: ICourse[] = [];
  studentId: string = '';
  courseId: string = '';

  constructor(
    private coursesService: CoursesService,
    private matDialog: MatDialog,
    private breakinpointObserver: BreakpointObserver,
    private enrollmentService: EnrollmentService,
    private studentsService: StudentsService
  ) {
    this.breakinpointObserver.observe([Breakpoints.Handset]).subscribe((r) => {
      if (r.matches) {
        this.displayedColumns = ['name', 'instructor', 'actions'];
      } else {
        this.displayedColumns = [
          'id',
          'name',
          'startDate',
          'durationMonths',
          'instructor',
          'actions',
        ];
      }
    });
    // this.courses$ = this.coursesService.getCourses();
  }

  ngOnInit(): void {
    this.loading = true;
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  openDialog(editingCourse?: ICourse): void {
    this.matDialog
      .open(CoursesDialogComponent, { data: editingCourse })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            if (editingCourse) {
              const updatedCourse: ICourse = { ...editingCourse, ...
                result };
              this.coursesService.updateCourse(updatedCourse).subscribe({
                next: () => {
                  this.courses = this.courses.map((c) =>
                    c.id === editingCourse.id ? { ...c, ...result } : 
                  c);
                },
                error: (error) => {
                  
                  swal.fire({
                    title: 'Error',
                    text: `Ocurrió un error al intentar editar el curso: ${error}`,
                    icon: 'success',
                    timer: 1000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                  });
                  console.log('Error al editar el curso: ', error);
                },
                complete: () => {
                  swal.fire({
                    title: '¡Cambios Aplicados!',
                    text: '¡El curso se ha editado correctamente!',
                    icon: 'success',
                    timer: 1000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                  });
                },
              });
            } else {
              this.coursesService.createCourse(result).subscribe({
                next: (createdCourse) => {
                  this.courses = [...this.courses, createdCourse];
                  console.log(result);
                },
                error: (error) => {
                  
                  swal.fire({
                    title: 'Error',
                    text: `Ocurrió un error al intentar agregar un curso: ${error}`,
                    icon: 'info',
                    timer: 1000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                  });
                  console.log('Error al crear el curso: ', error);
                },
                complete: () => {
                  swal.fire({
                    title: 'Curso Guardado!',
                    text: '¡El curso se ha agregado correctamente!',
                    icon: 'success',
                    timer: 1000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                  });
                },
              });
            }
          }
        },
      });
  }

  onDeleteCourse(id: number): void {
    swal .fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
      })
      .then((result) => {
        if (result.isConfirmed) {
            this.coursesService.deleteCourse(id).subscribe({
              next: () => {

                this.courses = this.courses.filter((course) => course.id !== id);
              },
              error: (error) => {
                swal.fire({
                  title: 'Error',
                  text: `Ocurrió un error al intentar eliminar el curso: ${error}`,
                  icon: 'info',
                  timer: 1000,
                  timerProgressBar: true,
                  showConfirmButton: false,
                });
                console.log('Error al intentar el curso: ', id);
              },
              complete: () => {
                swal.fire({
                  title: '¡Eliminado!',
                  text: 'El curso ha sido eliminado.',
                  icon: 'success',
                  timer: 1000,
                  timerProgressBar: true,
                  showConfirmButton: false,
                });
              },
            });
          
        } else if (result.dismiss) {
          swal.fire({
            title: 'Cancelado',
            text: 'Ningún curso fue eliminado',
            icon: 'info',
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
      });
  }




}
