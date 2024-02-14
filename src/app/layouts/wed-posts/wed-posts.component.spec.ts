import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WedPostsComponent } from './wed-posts.component';

describe('WedPostsComponent', () => {
  let component: WedPostsComponent;
  let fixture: ComponentFixture<WedPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WedPostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
