import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceManagementComponent } from './annonce-management.component';

describe('AnnonceManagementComponent', () => {
  let component: AnnonceManagementComponent;
  let fixture: ComponentFixture<AnnonceManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnonceManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
