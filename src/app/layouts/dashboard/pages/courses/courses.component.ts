import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICourse } from './models';
import { CoursesService } from './courses.service';
import { Observable, Observer, of, take, map, delay } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CursosDialogComponent } from './components/cursos-dialog/cursos-dialog.component';
import swal from 'sweetalert2';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import Swal from 'sweetalert2';


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

  loading: boolean = false;
  courses: ICourse[]  = [];

  constructor(
    private coursesService: CoursesService,
    private matDialog: MatDialog,
    private breakinpointObserver: BreakpointObserver ) {
      this.breakinpointObserver.observe([Breakpoints.Handset]).subscribe((r)=> {
        if (r.matches) {
          this.displayedColumns = ['name', 'instructor', 'actions']
        } else {
          this.displayedColumns = ['id', 'name', 'startDate', 'durationMonths', 'instructor', 'actions'];
        }
      });
      // this.courses$ = this.coursesService.getCourses();
    }

  ngOnInit(): void {
   this.loading = true;
   this.coursesService.getCourses()
      .subscribe({
    next: (courses) => {
      this.courses = courses;
    },
    error: (error) => {
      console.log(error);
    },
    complete: () => {
      this.loading = false;
    }

   })
  }



  openDialog(editingCourse?: ICourse): void {

    this.matDialog.open(CursosDialogComponent, {data: editingCourse})
    .afterClosed().subscribe({
      next: (result) => {
        if(result) {
          if(editingCourse) {
          this.courses = this.courses.map((c)=>
          c.id === editingCourse.id ? {...c, ...result} : c
        );
        swal.fire({
          title: '¡Cambios Aplicados!',
          text: '¡El curso se ha editado correctamente!',
          icon: 'success',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
          } else {
            this.coursesService.createCourse(result).subscribe({
              next: (createdCourse) => {
                this.courses = [...this.courses, createdCourse];
              }
            });
            swal.fire({
              title: 'Curso Guardado!',
              text: '¡El curso se ha agregado correctamente!',
              icon: 'success',
              timer: 1000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
        } 
      }
    }

    );
   
   
  }
  

  onDeleteCourse(id: number) : void {
    swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'No, cancelar',
    }).then((result)=> {
      if(result.isConfirmed) {
        if(this.courses) {
          this.courses = this.courses.filter((c) => c.id !== id);
          ;
        }
        Swal.fire({
          title: '¡Eliminado!', 
          text:   'El curso ha sido eliminado.',
          icon:   'success',
          timer:  1000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      } else if (result.dismiss){
        Swal.fire({
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
