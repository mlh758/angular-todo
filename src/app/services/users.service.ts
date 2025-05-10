import { inject, Injectable } from '@angular/core';
import { Role, StorageService, Store, User } from './storage.service';

export { type User } from './storage.service';
export const mockUser: User = {
  username: 'testuser',
  name: 'Test User',
  email: 'test@test.com',
  role: Role.USER,
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  storage = inject(StorageService);

  find(name: string) {
    return this.storage.get(Store.USERS, name);
  }

  create(user: User) {
    return this.storage.add(Store.USERS, user);
  }

  update(user: User) {
    return this.storage.put(Store.USERS, user);
  }
}
