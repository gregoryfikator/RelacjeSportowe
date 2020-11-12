import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTransmissionsComponent } from './all-transmissions.component';

describe('AllTransmissionsComponent', () => {
  let component: AllTransmissionsComponent;
  let fixture: ComponentFixture<AllTransmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTransmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTransmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
