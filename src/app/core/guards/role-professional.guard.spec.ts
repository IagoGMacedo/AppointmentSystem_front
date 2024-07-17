import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { roleProfessionalGuard } from './role-professional.guard';

describe('roleProfessionalGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => roleProfessionalGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
