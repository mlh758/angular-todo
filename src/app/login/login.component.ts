import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { UsersService } from '../services/users.service';
import { first, tap } from 'rxjs';

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
  router = inject(Router);
  unableToFindUser = false;
  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.getRawValue().username!;
      const user$ = this.userService.find(username).pipe(first());
      user$.subscribe((user) => {
        if (user) {
          this.router.navigate(['/tasks']);
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
