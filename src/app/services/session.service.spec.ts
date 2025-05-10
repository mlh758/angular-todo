import { TestBed } from '@angular/core/testing';

import { SessionService } from './session.service';
import { mockUser } from './users.service';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  afterEach(() => {
    service.destroySession();
  });

  it('updates current user when impersonating', () => {
    const user = mockUser;
    service.establishSession(user);
    service.impersonate({ ...mockUser, username: 'other' });
    expect(service.currentUser()?.username).toBe('other');
    service.stopImpersonating();
    expect(service.currentUser()?.username).toBe(mockUser.username);
  });

  it('updates the current user when a storage event is received', () => {
    const user = mockUser;
    service.establishSession(user);
    const newUser = { ...mockUser, username: 'other' };
    window.localStorage.setItem('currentUser', JSON.stringify(newUser));
    const event = new StorageEvent('storage', {
      key: 'currentUser',
      newValue: JSON.stringify(newUser),
      storageArea: window.localStorage,
    });
    window.dispatchEvent(event);
    expect(service.currentUser()?.username).toBe('other');
  });
});
