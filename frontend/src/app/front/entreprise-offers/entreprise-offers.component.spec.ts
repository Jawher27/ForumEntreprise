import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepriseOffersComponent } from './entreprise-offers.component';

describe('EntrepriseOffersComponent', () => {
  let component: EntrepriseOffersComponent;
  let fixture: ComponentFixture<EntrepriseOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrepriseOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrepriseOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
