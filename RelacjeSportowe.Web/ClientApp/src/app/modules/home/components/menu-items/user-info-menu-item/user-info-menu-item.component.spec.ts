import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoMenuItemComponent } from './user-info-menu-item.component';

describe('UserInfoMenuItemComponent', () => {
  let component: UserInfoMenuItemComponent;
  let fixture: ComponentFixture<UserInfoMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
