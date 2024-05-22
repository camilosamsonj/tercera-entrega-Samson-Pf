import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../../environments/environment';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentComponent } from './enrollment.component';
import { SharedModule } from '../../../../shared/shared.module';
import { EnrollmentRoutingModule } from './enrollment-routing.module';
import { CommonModule } from '@angular/common';
import { StudentsService } from '../students/students.service';
import { CoursesService } from '../courses/courses.service';
import { IStudent } from '../students/models';
import { of } from 'rxjs';
import { ICourse } from '../courses/models';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




describe('Pruebas del Componente "EnrollmentComponent" ', () => {
  let component: EnrollmentComponent;
  let fixture: ComponentFixture<EnrollmentComponent>;
  let mockEnrollmentService: jasmine.SpyObj<EnrollmentService>;
  let mockStudentsService: jasmine.SpyObj<StudentsService>;
  let mockCoursesService: jasmine.SpyObj<CoursesService>;



  beforeEach(() => {
    mockEnrollmentService = jasmine.createSpyObj('EnrollmentService', [
        'enrollStudentInCourse',
        'addStudentsToCourse',
        'unenrollStudentFromCourse',
        'updateCourseAfterStudentRemoval'
    ]);
    mockStudentsService = jasmine.createSpyObj('StudentsService', [
        'getStudents',
        'createStudent',
        'updateStudent',
        'deleteStudent',
        'getStudentById'
    ])
    mockCoursesService = jasmine.createSpyObj('CoursesService', [
        'getCourses',
        'getCourseById',
        'createCourse',
        'deleteCourse',
        'getCourseById'
        ]);


    TestBed.configureTestingModule({
        declarations: [EnrollmentComponent],
        providers: [
            {provide: EnrollmentService, useValue: mockEnrollmentService},
            {provide: CoursesService, useValue: mockCoursesService},
            {provide: StudentsService, useValue: mockStudentsService},

        ],
        imports: [HttpClientTestingModule, SharedModule, EnrollmentRoutingModule, CommonModule, BrowserAnimationsModule],
    });



    fixture = TestBed.createComponent(EnrollmentComponent);
    component = fixture.componentInstance;

  });


  it('Componente debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('Debería obtener la lista de estudiantes y cursos al iniciarse', () => {
      const mockStudents: IStudent[] = [];

      const mockCourses: ICourse[] = [];

      mockStudentsService.getStudents.and.returnValue(of(mockStudents));
      mockCoursesService.getCourses.and.returnValue(of(mockCourses));

      fixture.detectChanges();
      expect(component.students).toEqual(mockStudents);
      expect(component.courses).toEqual(mockCourses);

    });


   it('Debería inscribir un alumno en un curso', () => {
 
    const mockCourse: ICourse = { id: 1, name: 'Course 1', startDate: new Date(), durationMonths: 6, instructor: 'Juan', students: []  }
    mockCoursesService.getCourseById.and.returnValue(of(mockCourse));


    const mockStudent: IStudent = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', anoIngreso: 2022, courses: [] };
    
    mockStudentsService.getStudentById.and.returnValue(of(mockStudent));

    const enrolledStudent: IStudent = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        anoIngreso: 2022,
        courses: [
            { id: 1, name: 'Course 1', startDate: new Date(), durationMonths: 6, instructor: 'Juan'  }
        ] // Agregar el ID del curso al que se inscribió el estudiante
      };
    mockEnrollmentService.enrollStudentInCourse.and.returnValue(of(enrolledStudent));

    component.courseId = '1';
    component.studentId = '1';
    component.enrollStudent();
    
    expect(mockEnrollmentService.enrollStudentInCourse).toHaveBeenCalledWith(component.studentId, jasmine.any(Object));
   })


   it('Debería desinscribir un estudiante del curso', () => {

    const mockStudent: IStudent = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      anoIngreso: 2022,
      courses: [
          { id: 1, name: 'Course 1', startDate: new Date(), durationMonths: 6, instructor: 'Juan'  }
      ] // Agregar el ID del curso al que se inscribió el estudiante
    };
   

    const mockCourse: ICourse = { id: 1, name: 'Course 1', startDate: new Date(), durationMonths: 6, instructor: 'Juan', students: [{
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      anoIngreso: 2022,
      courses: [
          { id: 1, name: 'Course 1', startDate: new Date(), durationMonths: 6, instructor: 'Juan'  }
      ] // Agregar el ID del curso al que se inscribió el estudiante
    }]  }
    mockStudentsService.getStudentById.and.returnValue(of(mockStudent));
    mockCoursesService.getCourseById.and.returnValue(of(mockCourse));

    
    component.unenrollStudentId = '1';
    component.unenrollCourseId = '1';

    
    component.unenrollStudent();
    expect(mockEnrollmentService.unenrollStudentFromCourse).toHaveBeenCalledWith(component.unenrollStudentId, component.unenrollCourseId, mockStudent);
    // expect(mockEnrollmentService.updateCourseAfterStudentRemoval).toHaveBeenCalledWith(component.unenrollCourseId, component.unenrollStudentId);


   })


  })
