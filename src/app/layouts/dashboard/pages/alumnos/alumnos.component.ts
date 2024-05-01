import { Component, OnDestroy, OnInit } from '@angular/core';
import { IStudent } from './models';
import { MatDialog } from '@angular/material/dialog';
import { AlumnosDialogComponent } from './components/alumnos-dialog/alumnos-dialog.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, delay, map, of, take } from 'rxjs';
import { AlumnosService } from './alumnos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss'],
})
export class AlumnosComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'anoIngreso',
    'actions',
  ];


  students$: Observable<IStudent[]> = of([]);
  loading = false;
  // studentsSubscription: Observable<IStudent[]> | null = null;

  constructor(
    private matDialog: MatDialog,
    private breakingpointObsver: BreakpointObserver,
    private alumnosService: AlumnosService
  ) {
    this.breakingpointObsver.observe([Breakpoints.Handset]).subscribe((res) => {
      if (res.matches) {
        this.displayedColumns = ['id', 'firstName', 'actions'];
      } else {
        this.displayedColumns = [ 'id', 'firstName', 'lastName', 'email', 'anoIngreso', 'actions',           
        ];
      }
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.alumnosService.getAlumnos().pipe(delay(900)).subscribe({
      next: (alumnosData: IStudent[]) => {
        this.students$ = of(alumnosData);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

  openDialog(editingStudent?: IStudent): void {
    const dialogRef = this.matDialog.open(AlumnosDialogComponent, {
      data: editingStudent,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.students$) {
        if (editingStudent) {
          this.students$ = this.students$.pipe(
            map((students) => {
              return students.map((student) => {
                return student.id === editingStudent.id
                  ? { ...student, ...result }
                  : student;
              });
           
            })
          );
          Swal.fire({
            title: '¡Cambios Aplicados!',
            text: '¡El usuario se ha editado correctamente!',
            icon: 'success'
          });
        } else {
            this.students$ = this.students$.pipe(
              map((students) => {
                let maxId = students.reduce((max, student) => (student.id > max ? student.id : max), 0);
                return [...students, { ...result, id: maxId + 1 }];
              })
            );
            Swal.fire({
              title: '¡Usuario Guardado!',
              text: '¡El usuario se ha agregado correctamente!',
              icon: 'success'
            });
          }
        }
      });
    }

    onDeleteStudent(id: number): void {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'No, cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.students$) {
            this.students$ = this.students$.pipe(
              take(1),
              map((students) => students.filter((student) => student.id !== id))
            );
          }
          Swal.fire('¡Eliminado!', 'El alumno ha sido eliminado.', 'success');
        } else if (result.isDenied) {
          Swal.fire('Cancelado', 'El alumno está seguro :)', 'info');
        }
      });
  }
}
