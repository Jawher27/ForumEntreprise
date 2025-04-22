import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondidatureManagementComponent } from './condidature-management.component'; 

describe('CondidatureManagementComponent', () => {
  let component: CondidatureManagementComponent;
  let fixture: ComponentFixture<CondidatureManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CondidatureManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CondidatureManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
