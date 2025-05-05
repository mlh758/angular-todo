import { inject, Injectable } from '@angular/core';
import { StorageService, Store, User } from './storage.service';

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
}
