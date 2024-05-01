import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICourse } from '../../models';

@Component({
  selector: 'app-cursos-dialog',
  templateUrl: './cursos-dialog.component.html',
  styleUrls: ['./cursos-dialog.component.scss']
})
export class CursosDialogComponent {
  isMobile(): boolean {
    return window.innerWidth < 768;
  }

  courseForm: FormGroup;
  startDate: Date[] = [
    new Date(2024, 1, 15),   
    new Date(2024, 3, 10),   
    new Date(2024, 5, 25),   
    new Date(2024, 8, 5),    
    new Date(2024, 10, 20)  
  ];

  constructor (
    private fb: FormBuilder, 
    private matDialogRef: MatDialogRef<CursosDialogComponent>,
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
    } else {
      this.matDialogRef.close(this.courseForm.value);
    }
  }

}
