import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoursesService } from './courses.service';
import { environment } from '../../../../../environments/environment';
import { ICourse, CreateCoursePayload } from './models';

describe('Pruebas del Servicio "CoursesService" ', () => {
  let service: CoursesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService]
    });
    service = TestBed.inject(CoursesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Servicio debería crearse', () => {
    expect(service).toBeTruthy();
  });

  it('Debería retornar los cursos', () => {
    const mockCourses: ICourse[] = [{ id: 1, name: 'Course 1', startDate: new Date(), durationMonths: 6, instructor: 'Juan' }, { id: 2, name: 'Course 2', startDate: new Date(), durationMonths: 12, instructor: 'Roberto' }];
    
    service.getCourses().subscribe(courses => {
      expect(courses).toEqual(mockCourses);
    });
    
    const req = httpMock.expectOne(`${environment.baseAPIURL}/courses`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });



  it('Debería crear un curso', () => {
    const payload: CreateCoursePayload = { name: 'Nuevo Curso', id: 3, startDate: new Date(), durationMonths: 5, instructor: 'Jimmy Carrasco' };
    const mockCourse: ICourse = { id: 4, name: 'Nuevo Curso 2', startDate: new Date(), durationMonths: 7, instructor: 'Alberto Ramirez' };
    
    service.createCourse(payload).subscribe(course => {
      expect(course).toEqual(mockCourse);
    });
    
    const req = httpMock.expectOne(`${environment.baseAPIURL}/courses`);
    expect(req.request.method).toBe('POST');
    req.flush(mockCourse);
  });



  it('Debería retornar un curso por su id', () => {

    const mockCourse: ICourse = { id: 4, name: 'Nuevo Curso 2', startDate: new Date(), durationMonths: 7, instructor: 'Alberto Ramirez' };
  
    service.getCourseById('4').subscribe(course => {
        expect(course).toEqual(mockCourse);
    });
  
    const req = httpMock.expectOne(`${environment.baseAPIURL}/courses/4`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourse);
  })

  
  
  it('Debería eliminar un curso', () => {
    const  courseId = 4;
    service.deleteCourse(courseId).subscribe(course=> {
        expect(course.id).toEqual(courseId);
    });
   
    const req = httpMock.expectOne(`${environment.baseAPIURL}/courses/${courseId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ id: courseId });
  });

  
  
  it('Debería actualizar un curso', () => {
    const updatedCourse: ICourse = { id: 4, name: 'Curso Actualizado', startDate: new Date(), durationMonths: 9, instructor: 'Juan Pérez'};
  
    service.updateCourse(updatedCourse).subscribe(course => {
        expect(course).toEqual(updatedCourse);
    });
    
    const req = httpMock.expectOne(`${environment.baseAPIURL}/courses/${updatedCourse.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedCourse);
    req.flush(updatedCourse);
    
  })

});
