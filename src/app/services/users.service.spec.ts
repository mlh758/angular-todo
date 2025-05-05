import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { DATABASE_NAME } from './storage.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DATABASE_NAME, useValue: 'TestDatabase' }],
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
