import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransmissionComponent } from './edit-transmission.component';

describe('EditTransmissionComponent', () => {
  let component: EditTransmissionComponent;
  let fixture: ComponentFixture<EditTransmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTransmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTransmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
