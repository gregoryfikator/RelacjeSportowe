import { TestBed } from '@angular/core/testing';

import { JwtAccessTokenService } from './jwt-access-token.service';

describe('JwtAccessTokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JwtAccessTokenService = TestBed.get(JwtAccessTokenService);
    expect(service).toBeTruthy();
  });
});
