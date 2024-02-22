import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserImageProfileComponent } from './user-image-profile.component';

describe('UserImageProfileComponent', () => {
  let component: UserImageProfileComponent;
  let fixture: ComponentFixture<UserImageProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserImageProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserImageProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
