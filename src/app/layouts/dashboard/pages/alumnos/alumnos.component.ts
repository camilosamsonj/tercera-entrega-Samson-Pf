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

  constructor(
    private matDialog: MatDialog,
    private breakingpointObsver: BreakpointObserver,
    private alumnosService: AlumnosService
  ) {
    this.breakingpointObsver.observe([Breakpoints.Handset]).subscribe((res) => {
      if (res.matches) {
        this.displayedColumns = ['id', 'firstName', 'actions'];
      } else {
        this.displayedColumns = [
          'id',
          'firstName',
          'lastName',
          'email',
          'anoIngreso',
          'actions',
        ];
      }
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.alumnosService.getAlumnos().subscribe({
      next: (alumnosData: IStudent[]) => {
        this.students$ = of(alumnosData);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.loading = false;
      },
    });
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
            icon: 'success',
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        } else {
          this.students$ = this.students$.pipe(
            map((students) => {
              let maxId = students.reduce(
                (max, student) => (student.id > max ? student.id : max),
                0
              );
              return [...students, { ...result, id: maxId + 1 }];
            })
          );
          Swal.fire({
            title: '¡Usuario Guardado!',
            text: '¡El usuario se ha agregado correctamente!',
            icon: 'success',
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false,
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
        Swal.fire({
          title: '¡Eliminado!',
          text: 'El alumno ha sido eliminado.',
          icon: 'success',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else if (result.dismiss) {
        Swal.fire({
          title: 'Cancelado',
          text: 'Ningún alumno fue eliminado',
          icon: 'info',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    });
  }
}
