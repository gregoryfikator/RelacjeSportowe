import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTransmissionCasterPanelComponent } from './live-transmission-caster-panel.component';

describe('LiveTransmissionCasterPanelComponent', () => {
  let component: LiveTransmissionCasterPanelComponent;
  let fixture: ComponentFixture<LiveTransmissionCasterPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveTransmissionCasterPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveTransmissionCasterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
