import { Component } from '@angular/core';
import { Observable} from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ICourse } from '../../models';
import { CoursesService } from '../../courses.service';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../../students/students.service';

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrls: ['./courses-detail.component.scss']
})
export class CoursesDetailComponent {

  course$: Observable<ICourse | undefined>;
  loading = false;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private studentsService: StudentsService
  ) {
    this.loading = true;
    this.course$ = this.coursesService.getCourseById(this.activatedRoute.snapshot.params['id'])
    .pipe(      
      finalize(()=> {
        this.loading = false;
      })
    );
    console.log(this.course$);

  }

  

}
