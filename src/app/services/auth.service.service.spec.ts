import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service.service';

describe('Auth.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
