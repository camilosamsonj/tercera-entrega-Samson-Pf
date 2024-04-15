import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosDialogComponent } from './alumnos-dialog.component';

describe('AlumnosDialogComponent', () => {
  let component: AlumnosDialogComponent;
  let fixture: ComponentFixture<AlumnosDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlumnosDialogComponent]
    });
    fixture = TestBed.createComponent(AlumnosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
