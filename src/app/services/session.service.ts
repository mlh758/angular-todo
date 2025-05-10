import {
  DestroyRef,
  inject,
  Injectable,
  InjectionToken,
  Signal,
  signal,
} from '@angular/core';
import { User } from './users.service';
import { fromEvent, Subscription, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

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
  private _currentUser = signal<User | null>(null);
  currentUser = this._currentUser.asReadonly();
  private _trueUser = signal<User | null>(null);
  destroyRef = inject(DestroyRef);
  router = inject(Router);

  trueUser = this._trueUser.asReadonly();

  storageChanges$: Subscription | null = null;

  constructor() {
    // Some components are rendered server side and so window won't exist
    if (typeof window === 'undefined') {
      return;
    }
    fromEvent(window, 'storage')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (event instanceof StorageEvent && event.key === 'currentUser') {
          const user = event.newValue ? JSON.parse(event.newValue) : null;
          this.stopImpersonating();
          if (!user) {
            this.router.navigate(['/']);
          }
          this._currentUser.set(user);
        }
      });
    const storedUser = window.localStorage.getItem('currentUser');
    if (storedUser) {
      this._currentUser.set(JSON.parse(storedUser));
    }
  }

  establishSession(user: User) {
    this._currentUser.set(user);
    window.localStorage.setItem('currentUser', JSON.stringify(user));
  }

  destroySession() {
    this._currentUser.set(null);
    window.localStorage.removeItem('currentUser');
  }

  impersonate(user: User) {
    this._trueUser.set(this.currentUser());
    this._currentUser.set(user);
  }

  stopImpersonating() {
    if (!this.isImpersonating()) {
      return;
    }
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
