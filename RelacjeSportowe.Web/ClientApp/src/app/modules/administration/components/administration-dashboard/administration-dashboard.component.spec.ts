import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationDashboardComponent } from './administration-dashboard.component';

describe('AdministrationDashboardComponent', () => {
  let component: AdministrationDashboardComponent;
  let fixture: ComponentFixture<AdministrationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
