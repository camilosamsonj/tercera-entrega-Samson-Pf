import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule} from '@angular/material/list';
import { MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormFieldValidationErrorsPipe } from './pipes/form-field-validation-errors.pipe';
import { MatSelectModule} from '@angular/material/select';
import { LayoutModule} from '@angular/cdk/layout';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FormsModule } from '@angular/forms';








@NgModule({
  declarations: [
    FormFieldValidationErrorsPipe,
  ],
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    LayoutModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,


    


    
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    LayoutModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,

  ]
})
export class SharedModule { }
