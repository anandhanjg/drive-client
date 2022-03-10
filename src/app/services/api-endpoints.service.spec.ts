import { TestBed } from '@angular/core/testing';

import { ApiEndpoints } from './api-endpoints.service';

describe('ApiEndpointsService', () => {
  let service: ApiEndpoints;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiEndpoints);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
