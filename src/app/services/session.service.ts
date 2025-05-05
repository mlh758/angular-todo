import { Injectable, signal } from '@angular/core';
import { User } from './storage.service';
/**
 * Pretend this is an http service that fetches the current user from the server
 * based on a session cookie or a stored token.
 *
 * The idea of exposing a readonly signal is that the rest of the app
 * shouldn't be able to modify the current user directly. In this case though,
 * we don't have any other way to establish a session for the example.
 */
@Injectable({
  providedIn: 'root',
})
export class SessionService {
  _currentUser = signal<User | null>(null);
  currentUser = this._currentUser.asReadonly();

  constructor() {
    const storedUser = window.sessionStorage.getItem('currentUser');
    if (storedUser) {
      this._currentUser.set(JSON.parse(storedUser));
    }
  }

  establishSession(user: User) {
    this._currentUser.set(user);
    window.sessionStorage.setItem('currentUser', JSON.stringify(user));
  }

  destroySession() {
    this._currentUser.set(null);
    window.sessionStorage.removeItem('currentUser');
  }
}
