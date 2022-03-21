import { TestBed } from '@angular/core/testing';

import { VideoResolver } from './video.resolver';

describe('VideoService', () => {
  let service: VideoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
