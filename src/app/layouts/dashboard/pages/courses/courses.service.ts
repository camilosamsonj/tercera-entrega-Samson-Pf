import { Injectable } from '@angular/core';
import { CreateCoursePayload, ICourse } from './models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httpClient: HttpClient){}

 getCourses(): Observable<ICourse[]> {
  return this.httpClient.get<ICourse[]>(environment.baseAPIURL + '/courses');
 }

 getCourseById(id: string):Observable<ICourse | undefined>{
  return this.httpClient.get<ICourse>(`${environment.baseAPIURL}/courses/${id}`);
 }

 createCourse(payload: CreateCoursePayload): Observable<ICourse>{
  return this.httpClient.post<ICourse>(`${environment.baseAPIURL}/courses`, payload);
 }
 }