import { TestBed } from '@angular/core/testing';

import { TransmissionHubService } from './transmission-hub.service';

describe('TransmissionHubService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransmissionHubService = TestBed.get(TransmissionHubService);
    expect(service).toBeTruthy();
  });
});
