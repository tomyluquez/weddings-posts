import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonScrollToUpComponent } from './button-scroll-to-up.component';

describe('ButtonScrollToUpComponent', () => {
  let component: ButtonScrollToUpComponent;
  let fixture: ComponentFixture<ButtonScrollToUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonScrollToUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonScrollToUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
