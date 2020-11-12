import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTransmissionPanelComponent } from './live-transmission-panel.component';

describe('LiveTransmissionPanelComponent', () => {
  let component: LiveTransmissionPanelComponent;
  let fixture: ComponentFixture<LiveTransmissionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveTransmissionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveTransmissionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
