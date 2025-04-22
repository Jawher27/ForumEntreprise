import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesResComponent } from './mes-res.component';

describe('MesResComponent', () => {
  let component: MesResComponent;
  let fixture: ComponentFixture<MesResComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesResComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
