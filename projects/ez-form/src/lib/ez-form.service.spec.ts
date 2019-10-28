import { TestBed } from '@angular/core/testing';

import { EzFormService } from './ez-form.service';

describe('EzFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EzFormService = TestBed.get(EzFormService);
    expect(service).toBeTruthy();
  });
});
