import { Component, inject, signal, type WritableSignal } from '@angular/core';
import { SessionService } from '../../services/session.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { UsersService } from '../../services/users.service';

type ErrorType = 'userNotFound' | 'serverError';

/**
 * This screen allows an admin to impersonate another user by entering their
 * username.
 */
@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  sessionService = inject(SessionService);
  usersService = inject(UsersService);
  submitting = signal(false);
  error: WritableSignal<ErrorType | null> = signal(null);

  form = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  handleSubmit() {
    if (!this.form.valid) {
      return;
    }
    const username = this.form.get('username')?.value!;
    this.submitting.set(true);
    this.usersService.find(username).subscribe({
      next: (user) => {
        this.submitting.set(false);
        if (user) {
          this.sessionService.impersonate(user);
        } else {
          this.error.set('userNotFound');
        }
      },
      error: (err) => {
        console.error('Error finding user:', err);
        this.submitting.set(false);
        this.error.set('serverError');
      },
    });
  }
}
