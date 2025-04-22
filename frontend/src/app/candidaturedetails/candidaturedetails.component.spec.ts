import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidaturedetailsComponent } from './candidaturedetails.component';

describe('CandidaturedetailsComponent', () => {
  let component: CandidaturedetailsComponent;
  let fixture: ComponentFixture<CandidaturedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidaturedetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidaturedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
