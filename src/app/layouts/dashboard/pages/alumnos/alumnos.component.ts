import { Component } from '@angular/core';
import { IStudent } from './models';
import { MatDialog } from '@angular/material/dialog';
import { AlumnosDialogComponent } from './components/alumnos-dialog/alumnos-dialog.component';



@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent {

    displayedColumns: string[] = [
        'id', 
        'firstName', 
        'lastName', 
        'email', 
        'anoIngreso', 
        'actions'
    ];

    students: IStudent[] = [
        {
          id: 1,
          firstName: "Tony",
          lastName: "Soprano",
          email: "tony.soprano@newyork.com",
          anoIngreso: 2020,
      
      },
      {
          id: 2,
          firstName: "Carmela",
          lastName: "Soprano",
          email: "carmela.soprano@newyork.com",
          anoIngreso: 2021,
      
      },
      {
          id: 3,
          firstName: "Christopher",
          lastName: "Moltisanti",
          email: "christopher.moltisanti@newyork.com",
          anoIngreso: 2022,
      },
      {
          id: 4,
          firstName: "Paulie",
          lastName: "Gualtieri",
          email: "paulie.gualtieri@newyork.com",
          anoIngreso: 2019,
      },
      {
          id: 5,
          firstName: "Silvio",
          lastName: "Dante",
          email: "silvio.dante@newyork.com",
          anoIngreso: 2021,
      },
      {
          id: 6,
          firstName: "Jennifer",
          lastName: "Melfi",
          email: "jennifer.melfi@newyork.com",
          anoIngreso: 2023,
      },
      {
          id: 7,
          firstName: "Corrado",
          lastName: "Soprano",
          email: "junior.soprano@newyork.com",
          anoIngreso: 2019,
      },
      {
          id: 8,
          firstName: "Meadow",
          lastName: "Soprano",
          email: "meadow.soprano@newyork.com",
          anoIngreso: 2023,
      },
      {
          id: 9,
          firstName: "Anthony Jr.",
          lastName: "Soprano",
          email: "aj.soprano@newyork.com",
          anoIngreso: 2024,
      },
      {
          id: 10,
          firstName: "Adriana",
          lastName: "La Cerva",
          email: "adriana.lacerva@newyork.com",
          anoIngreso: 2022,
      
      }
      
      ];

  


constructor(private matDialog: MatDialog) {}


// openDialog(editingStudent?: IStudent): void {
//     this.matDialog
//     .open(AlumnosDialogComponent, {
//         data: editingStudent,
//     })
//     .afterClosed()
//     .subscribe({
//         next: (result) => {
//             if (result) {
//                 if (editingStudent) {
//                     this.students = this.students.map((student) =>
//                     student.id === editingStudent.id ? { ...student, ...result } : student);
//                 } else {
//                     this.students.push({ id: this.students.length + 1, ... result});
//                 }
//             }
//         }
//     });
// }


openDialog(editingStudent?: IStudent): void {

    const dialogRef = this.matDialog.open(AlumnosDialogComponent, {
        data: editingStudent,
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            if (editingStudent) {
                this.students = this.students.map((student) =>
                    student.id === editingStudent.id ? { ...student, ...result } : student);
            } else {
                let currentId = this.students.length;
                result.id = currentId + 1;
                this.students = [...this.students, result];
            }
        }
    }); 
}
    
       
onDeleteStudent(id: number): void {
    this.students = this.students.filter((student) => student.id !== id);
  }
}


