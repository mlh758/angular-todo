import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { provideTestDbName } from './storage.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideTestDbName()],
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
