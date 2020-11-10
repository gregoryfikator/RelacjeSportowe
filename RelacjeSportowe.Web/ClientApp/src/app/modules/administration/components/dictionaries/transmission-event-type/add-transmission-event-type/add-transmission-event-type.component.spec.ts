import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransmissionEventTypeComponent } from './add-transmission-event-type.component';

describe('AddTransmissionEventTypeComponent', () => {
  let component: AddTransmissionEventTypeComponent;
  let fixture: ComponentFixture<AddTransmissionEventTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTransmissionEventTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransmissionEventTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
