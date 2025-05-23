import { TestBed } from '@angular/core/testing';

import { ValidationTextService } from './validation-text.service';

describe('ValidationTextService', () => {
  let service: ValidationTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
