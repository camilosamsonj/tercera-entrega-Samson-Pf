import { Component, OnInit } from '@angular/core';
import { IUser } from './models';
import { Observable, of, map, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from './users.service';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users$',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'role',
    'createdAt',
    'actions',
  ]

  loading = false;

  users$: Observable<IUser[]> = of([]);

  
  constructor(
    private matDialog: MatDialog,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.usersService.getUsers().subscribe({
      next: (users$: IUser[]) => {
        this.users$ = of(users$)
      },
      complete: () => {
        this.loading = false;
      }
    })
  }


  openDialog(editingUser?: IUser): void {
    const dialogRef = this.matDialog.open(UsersDialogComponent, {
      data: editingUser,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.users$) {
        if (editingUser) {
          this.users$ = this.users$.pipe(
            map((users$) => {
              return users$.map((user) => {
                return user.id === editingUser.id
                  ? { ...user, ...result }
                  : user});
            })
          );
          Swal.fire({
            title: '¡Cambios Aplicados!',
            text: '¡El usuario se ha editado correctamente!',
            icon: 'success',
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false  
          });
        } else {
            this.users$ = this.users$.pipe(
              map((users$) => {
              let maxId = users$.reduce((max, user) => (user.id > max ? user.id : max), 0);
                return [...users$, { ...result, id: maxId + 1 }];
              })
            );
            Swal.fire({
              title: '¡Usuario Guardado!',
              text: '¡El usuario se ha agregado correctamente!',
              icon: 'success',
              timer: 1000,
              timerProgressBar: true, 
              showConfirmButton: false 
            });
          }
        }
      });
    }

    onDeleteUser(id: number): void {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'No, cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.users$) {
            this.users$ = this.users$.pipe(
              take(1),
              map((users) => users.filter((user) => user.id !== id))
            );
          }
          Swal.fire({
            title: '¡Eliminado!', 
            text:   'El usuario ha sido eliminado.',
            icon:   'success',
            timer:  1000,
            timerProgressBar: true,
            showConfirmButton: false
          });
        } else if (result.dismiss) {
          Swal.fire({
            title: 'Cancelado',
            text: 'Ningún usuario fue eliminado',
            icon: 'info',
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
      });
    }


}
