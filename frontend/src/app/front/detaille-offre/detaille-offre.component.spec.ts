import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailleOffreComponent } from './detaille-offre.component';

describe('DetailleOffreComponent', () => {
  let component: DetailleOffreComponent;
  let fixture: ComponentFixture<DetailleOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailleOffreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailleOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
