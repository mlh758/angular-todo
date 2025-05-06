import { computed, inject } from '@angular/core';
import { SessionService, UserSignal } from '../services/session.service';

/**
 * Using the session service directly, the type of the signal is
 * `Signal<User | null>`, but we want to provide a signal that is
 * always defined to make access easier when we're sure we're in an
 * authenticated context.
 */
export const provideUserSignal = () => ({
  provide: UserSignal,
  useFactory: () => {
    const userService = inject(SessionService);
    return computed(() => {
      const val = userService.currentUser();
      if (!val) {
        throw new Error('User not found');
      }
      return val;
    });
  },
});
