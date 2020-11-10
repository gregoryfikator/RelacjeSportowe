import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmissionEventTypesListComponent } from './transmission-event-types-list.component';

describe('TransmissionEventTypesListComponent', () => {
  let component: TransmissionEventTypesListComponent;
  let fixture: ComponentFixture<TransmissionEventTypesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransmissionEventTypesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransmissionEventTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
