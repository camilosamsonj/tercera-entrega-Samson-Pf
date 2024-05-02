import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICourse } from './models';
import { CursosService } from './cursos.service';
import { Observable, Observer, of, take, map, delay } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CursosDialogComponent } from './components/cursos-dialog/cursos-dialog.component';
import Swal from 'sweetalert2';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent {
  displayedColumns: string[] = [
    'code',
    'name',
    'startDate',
    'durationMonths',
    'instructor',
    'actions',
  ];

  loading: boolean = false;
  courses$: Observable<ICourse[]>  = of([]);

  constructor(
    private coursesService: CursosService,
    private matDialog: MatDialog,
    private breakinpointObserver: BreakpointObserver ) {
      this.breakinpointObserver.observe([Breakpoints.Handset]).subscribe((r)=> {
        if (r.matches) {
          this.displayedColumns = ['name', 'instructor', 'actions']
        } else {
          this.displayedColumns = ['code', 'name', 'startDate', 'durationMonths', 'instructor', 'actions'];
        }
      });
      // this.courses$ = this.coursesService.getCourses();
    }

  ngOnInit(): void {
   this.loading = true;
   this.coursesService.getCourses().pipe(delay(500))
   .subscribe({
    next: (coursesData: ICourse[]) => {
      this.courses$ = of(coursesData);
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
    const dialogRef = this.matDialog.open(CursosDialogComponent, {
      data: editingCourse,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result && this.courses$) {
        if(editingCourse) {
          this.courses$ = this.courses$.pipe(
            map((courses)=> {
              return courses.map((course)=> {
                return course.code === editingCourse.code
                  ? { ...course, ...result} 
                  : course; 
              });

            })
          );
          Swal.fire({
            title: '¡Cambios Aplicados!',
            text: '¡El curso se ha editado correctamente!',
            icon: 'success'
          });
         } else {
          this.courses$ = this.courses$.pipe(
            map((courses) => {
              let maxCode = 0;
              if(courses.length > 0) {
                maxCode = courses.reduce((max, course) => (course.code > max ?
                  course.code : max), 0);
                }
                return [...courses, { ...result, code: maxCode + 1}];
              })
            );

          Swal.fire({
            title: 'Curso Añadido!',
            text: '¡El curso se ha agregado correctamente!',
            icon: 'success'
          });
        }
      }
    });
  }
  

  onDeleteCourse(code: number) : void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'No, cancelar',
    }).then((result)=> {
      if(result.isConfirmed) {
        if(this.courses$) {
          this.courses$ = this.courses$.pipe(
            take(1),
            map((courses) => courses.filter((course) => course.code !== code))
          );
        }
        Swal.fire('¡Eliminado!', 'El curso ha sido eliminado.', 'success');
      } else if (result.isDenied){
        Swal.fire('Cancelado', 'Ningún curso ha sido eliminado: ', 'info');
      }
    })
  }

}
