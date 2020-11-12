import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTransmissionsComponent } from './my-transmissions.component';

describe('MyTransmissionsComponent', () => {
  let component: MyTransmissionsComponent;
  let fixture: ComponentFixture<MyTransmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTransmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTransmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
