import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionService, UserSignal } from '../../services/session.service';
import { User, UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';
import { ButtonComponent } from '../../components/button/button.component';

/**
 * This component allows the user to update their profile information.
 * Username is intended to be immutable, so it is disabled in the form.
 *
 * For the best UX, all users can change their own role to admin and interfere
 * with other users' tasks.
 */
@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  currentUser = inject(UserSignal);
  userService = inject(UsersService);
  sessionService = inject(SessionService);
  fb = inject(FormBuilder);
  updating = signal(false);
  updateError = signal(false);
  existingRequest: Subscription | null = null;

  form = this.fb.group({
    name: [this.currentUser().name, Validators.required],
    username: [this.currentUser().username],
    email: [this.currentUser().email, [Validators.required, Validators.email]],
    role: [this.currentUser().role, Validators.required],
  });

  constructor() {
    this.form.get('username')?.disable();
  }

  handleSubmit() {
    if (this.form.valid) {
      const updatedUser = {
        ...this.form.value,
        username: this.currentUser().username,
      } as User;
      this.updating.set(true);
      this.updateError.set(false);
      // we disable the submit button while we work, but jut in case
      // we want to clear the previous request to ensure we don't update the session
      // with an old user object
      this.existingRequest?.unsubscribe();
      this.existingRequest = this.userService.update(updatedUser).subscribe({
        next: () => {
          this.updating.set(false);
          this.sessionService.establishSession(updatedUser);
        },
        error: (err) => {
          this.updating.set(false);
          this.updateError.set(true);
          console.error('Error updating user:', err);
        },
      });
    }
  }
}
