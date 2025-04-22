import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAnnouncementComponent } from './type-announcement.component';

describe('TypeAnnouncementComponent', () => {
  let component: TypeAnnouncementComponent;
  let fixture: ComponentFixture<TypeAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeAnnouncementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
