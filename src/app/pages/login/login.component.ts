import { Component, inject } from '@angular/core';
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
  unableToFindUser = false;
  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.getRawValue().username!;
      const user$ = this.userService.find(username).pipe(first());
      user$.subscribe((user) => {
        if (user) {
          this.sessionService.establishSession(user);
          this.router.navigate(['/auth/tasks']);
        } else {
          this.unableToFindUser = true;
          setTimeout(() => {
            this.unableToFindUser = false;
          }, 3000);
        }
      });
    }
  }
}
