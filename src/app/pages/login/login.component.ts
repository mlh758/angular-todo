import { Component, effect, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { UsersService } from '../../services/users.service';
import { first } from 'rxjs';
import { SessionService } from '../../services/session.service';

/**
 * We don't actually bother with passwords in this demo app so you log
 * in with just a username.
 *
 * The component redirects away if the user becomes logged in.
 */
@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, ButtonComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });
  userService = inject(UsersService);
  sessionService = inject(SessionService);
  router = inject(Router);
  unableToFindUser = signal(false);

  constructor() {
    effect(() => {
      // We do the check here in case the user naviagates back to this
      // while already logged in.
      const user = this.sessionService.currentUser();
      if (user) {
        this.router.navigate(['/auth/tasks']);
      }
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.getRawValue().username!;
      const user$ = this.userService.find(username).pipe(first());
      user$.subscribe((user) => {
        if (user) {
          this.sessionService.establishSession(user);
        } else {
          this.unableToFindUser.set(true);
          setTimeout(() => {
            this.unableToFindUser.set(false);
          }, 3000);
        }
      });
    }
  }
}
