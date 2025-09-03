import { TestBed } from '@angular/core/testing';

import { JointUsService } from './joint-us.service';

describe('JointUsService', () => {
  let service: JointUsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JointUsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
