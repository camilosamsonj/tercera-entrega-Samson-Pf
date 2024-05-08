import { Component, OnInit } from '@angular/core';
import { IStudent } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { StudentsService } from './students.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
})
export class StudentsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'anoIngreso',
    'actions',
  ];

  students: IStudent[] = [];
  loading = false;

  constructor(
    private matDialog: MatDialog,
    private breakingpointObsver: BreakpointObserver,
    private studentsService: StudentsService
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
    this.studentsService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
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
    this.matDialog
      .open(StudentDialogComponent, {
        data: editingStudent,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            if (editingStudent) {
                const updatedStudent: IStudent = {...editingStudent, ...result};
                this.studentsService.updateStudent(updatedStudent).subscribe({
                  next: () => {
                    this.students = this.students.map((s)=>
                    s.id === editingStudent.id ? {...s, ...result} : s);                  
                  },
                  error: (error) => {
                    console.error('Error al actualizar al estudiante: ', error)
                  }
                })
              
             
            } else {
              this.studentsService.createStudent(result).subscribe({
                next: (createdStudent) => {
                  this.students = [...this.students, createdStudent];
                  console.log(result);
                },
              });
              swal.fire({
                title: '¡Usuario Guardado!',
                text: '¡El usuario se ha agregado correctamente!',
                icon: 'success',
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            }

            
          }
        },
      });
  }

  onDeleteStudent(id: number): void {
    swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'No, cancelar',
    }).then((result)=> {
      if(result.isConfirmed) {
        this.studentsService.deleteStudent(id).subscribe({
          next: () => {
            
            this.students = this.students.filter(student => student.id !== id);
            
            swal.fire({
              title: '¡Eliminado!',
              text: 'El alumno ha sido eliminado.',
              icon: 'success',
              timer: 1000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          },
          error: (error) => {
            swal.fire({
              title: 'Error',
              text: 'Ocurrió un error al eliminar el alumno',
              icon: 'info',
              timer: 1000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            console.log(error);
          },
          complete: () => {
            swal.fire({
              title: '¡Eliminado!',
              text: 'El alumno ha sido eliminado.',
              icon: 'success',
              timer: 1000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
      });
    } else {
      swal.fire({
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
