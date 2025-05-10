import { Injectable, InjectionToken, Signal, signal } from '@angular/core';
import { User } from './users.service';

/**
 * Provides an alternative way to inject the current user directly.
 * Can provide more convenient access when we know we're in an authenticated
 * context
 */
export const UserSignal = new InjectionToken<Signal<User>>('UserSignal');
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
  _trueUser = signal<User | null>(null);
  trueUser = this._trueUser.asReadonly();

  constructor() {
    if (typeof window === 'undefined') {
      return;
    }
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

  impersonate(user: User) {
    this._trueUser.set(this.currentUser());
    this._currentUser.set(user);
  }

  stopImpersonating() {
    this._currentUser.set(this._trueUser());
    this._trueUser.set(null);
  }

  isImpersonating(): boolean {
    const currentUser = this._currentUser();
    const trueUser = this._trueUser();
    return (
      currentUser !== null &&
      trueUser !== null &&
      currentUser.username !== trueUser.username
    );
  }
}
