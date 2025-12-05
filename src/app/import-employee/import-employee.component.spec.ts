import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportEmployeeComponent } from './import-employee.component';

describe('ImportEmployeeComponent', () => {
  let component: ImportEmployeeComponent;
  let fixture: ComponentFixture<ImportEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportEmployeeComponent]
    });
    fixture = TestBed.createComponent(ImportEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
