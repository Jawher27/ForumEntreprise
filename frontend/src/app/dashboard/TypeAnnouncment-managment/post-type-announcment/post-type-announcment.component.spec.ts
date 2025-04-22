import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTypeAnnouncmentComponent } from './post-type-announcment.component';

describe('PostTypeAnnouncmentComponent', () => {
  let component: PostTypeAnnouncmentComponent;
  let fixture: ComponentFixture<PostTypeAnnouncmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostTypeAnnouncmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTypeAnnouncmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
