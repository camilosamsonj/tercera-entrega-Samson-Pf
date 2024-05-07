import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from '../../alumnos.service';
import { IStudent } from '../../models';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-alumnos-detail',
  templateUrl: './alumnos-detail.component.html',
  styleUrls: ['./alumnos-detail.component.scss']
})
export class AlumnosDetailComponent implements OnInit{

  student$: Observable<IStudent | undefined>;
  loading = false;
 

  constructor(
    private activatedRoute: ActivatedRoute,
    private alumnosService: AlumnosService
  ) {
    
    this.student$ = this.alumnosService.getAlumnosById(parseInt(this.activatedRoute.snapshot.params['id']));

  }

  ngOnInit() {


  }
}