import { Component} from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { IStudent } from '../../models';
import { StudentsService } from '../../students.service';

@Component({
  selector: 'app-students-detail',
  templateUrl: './student-detail.component.html',
})
export class StudentDetailComponent {

  student$: Observable<IStudent | undefined>;
  loading = false;
 

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService
  ) {
    this.loading = true;
    this.student$ = this.studentsService.getStudentById(this.activatedRoute.snapshot.params['id'])
    .pipe(
      finalize(()=> {
        this.loading = false;
      })
    );

  }

}