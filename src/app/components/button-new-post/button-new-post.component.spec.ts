import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonNewPostComponent } from './button-new-post.component';

describe('ButtonNewPostComponent', () => {
  let component: ButtonNewPostComponent;
  let fixture: ComponentFixture<ButtonNewPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonNewPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonNewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
