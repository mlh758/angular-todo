import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { sessionResolver } from './session.resolver';
import { User } from '../services/storage.service';

describe('sessionResolver', () => {
  const executeResolver: ResolveFn<User> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => sessionResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
