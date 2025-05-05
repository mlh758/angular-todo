import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { sessionResolver } from './session.resolver';

describe('sessionResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => sessionResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
