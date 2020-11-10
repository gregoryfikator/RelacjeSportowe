import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransmissionEventTypeComponent } from './edit-transmission-event-type.component';

describe('EditTransmissionEventTypeComponent', () => {
  let component: EditTransmissionEventTypeComponent;
  let fixture: ComponentFixture<EditTransmissionEventTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTransmissionEventTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTransmissionEventTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
