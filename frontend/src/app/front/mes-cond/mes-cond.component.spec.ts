import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesCondComponent } from './mes-cond.component';

describe('MesCondComponent', () => {
  let component: MesCondComponent;
  let fixture: ComponentFixture<MesCondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesCondComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesCondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
