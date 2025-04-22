import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidaturelistComponent } from './candidaturelist.component';

describe('CandidaturelistComponent', () => {
  let component: CandidaturelistComponent;
  let fixture: ComponentFixture<CandidaturelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidaturelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidaturelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
