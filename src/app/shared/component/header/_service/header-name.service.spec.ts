import { TestBed } from '@angular/core/testing';

import { HeaderNameService } from './header-name.service';

describe('HeaderNameService', () => {
  let service: HeaderNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
