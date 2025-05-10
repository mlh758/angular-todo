import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { User } from '../services/users.service';

/**
 * You can return async or observable from a resolver as well.
 */
export const sessionResolver: ResolveFn<User> = (route, state) => {
  const sessionService = inject(SessionService);
  const router = inject(Router);
  const user = sessionService.currentUser();
  if (user) {
    return user;
  } else {
    return new RedirectCommand(router.parseUrl('/login'));
  }
};
