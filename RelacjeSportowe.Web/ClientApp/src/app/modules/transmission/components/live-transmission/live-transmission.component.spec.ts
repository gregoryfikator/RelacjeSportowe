import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTransmissionComponent } from './live-transmission.component';

describe('LiveTransmissionComponent', () => {
  let component: LiveTransmissionComponent;
  let fixture: ComponentFixture<LiveTransmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveTransmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveTransmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
