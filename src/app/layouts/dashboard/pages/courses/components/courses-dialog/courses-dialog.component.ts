import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICourse } from '../../models';
import swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html'
})
export class CoursesDialogComponent {
  isMobile(): boolean {
    return window.innerWidth < 768;
  }

  courseForm: FormGroup;
  

  constructor ( 
    
    private fb: FormBuilder, 
    private matDialogRef: MatDialogRef<CoursesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editingCourse?: ICourse
     ) {
    this.courseForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
        ]
      ],
      durationMonths: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.maxLength(2),
        ]
        
      ],
      instructor: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$'),
          Validators.minLength(2),
        ]

      ], 
      startDate: [
        '',
        [
          Validators.required,
        ]
      ]
    });

    if(editingCourse) {
      this.courseForm.patchValue(editingCourse);
    }
  }

  get nameControl(){
    return this.courseForm.get('name');
  }
  get durationMonthsControl(){
    return this.courseForm.get('durationMonths');
  }
  get instructorControl(){
    return this.courseForm.get('instructor');
  }
  get startDateControl(){
    return this.courseForm.get('startDate');
  }


  onSave(): void {
    if(this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      swal.fire({
        title: 'Formulario Inválido',
        text: 'Debe completar el formulario, o ingresar datos válidos',
        icon: 'warning',
        timer: 1500, 
        timerProgressBar: true, 
        showConfirmButton: false 
      });
      console.log(this.courseForm);
    } else {
      const updatedCourse: ICourse = this.courseForm.value;

      if(this.editingCourse) {
        updatedCourse.id  = this.editingCourse.id;
      }
      this.matDialogRef.close(updatedCourse);
    }
  }

}
