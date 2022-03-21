import { TestBed } from '@angular/core/testing';

import { AudioResolver } from './audio.resolver';

describe('Audio.ResolverService', () => {
  let service: AudioResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
