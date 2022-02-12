import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDoctorComponent } from './info-doctor.component';

describe('InfoDoctorComponent', () => {
  let component: InfoDoctorComponent;
  let fixture: ComponentFixture<InfoDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
