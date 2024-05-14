import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { IUser } from '../../models';
import { Observable, forkJoin, of } from 'rxjs';


@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.scss']
})
export class UsersDialogComponent {

  userForm: FormGroup;


  isMobile(): boolean {
    return window.innerWidth < 768;
  }

  constructor (
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<UsersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editingUser?: IUser,
   
  ) {
    this.userForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+$'),
          Validators.minLength(2),
        ]
      ],
      lastName: [
        '', 
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+$'),
          Validators.minLength(2),
        ]
      ],
      email: [
        '', 
        [
          Validators.email,
          Validators.required,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}'),
        ]
      ],
      role: [
        'USER',
        [
          Validators.required,
        ],
      
      ],
    });

    if(editingUser) {
      this.userForm.patchValue(editingUser);
    }
  }

  get firstNameControl(){
    return this.userForm.get('firstName');
  }
  get lastNameControl(){
    return this.userForm.get('lastName');
  }
  get emailControl(){
    return this.userForm.get('email');
  }
  get roleControl(){
    return this.userForm.get('role');
  }


  ngOnInit(): void {

  }

  onSave(): void {
    if(this.userForm.invalid){
      this.userForm.markAllAsTouched();
      Swal.fire({
        title: 'Formulario Inválido',
        text: 'Debe completar el formulario, o ingresar datos válidos',
        icon: 'warning',
        timer: 1500, 
        timerProgressBar: true, 
        showConfirmButton: false 
      });
    } else {
      this.matDialogRef.close(this.userForm.value);
    }
  }
}

