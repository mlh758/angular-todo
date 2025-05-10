import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionService, UserSignal } from '../../services/session.service';
import { User, UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';
import { ButtonComponent } from '../../components/button/button.component';

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
  updating = false;
  updateError = false;
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
      this.updating = true;
      this.updateError = false;
      if (this.existingRequest) {
        this.existingRequest.unsubscribe();
      }
      this.existingRequest = this.userService.update(updatedUser).subscribe({
        next: () => {
          this.updating = false;
          this.sessionService.establishSession(updatedUser);
        },
        error: (err) => {
          this.updating = false;
          this.updateError = true;
          console.error('Error updating user:', err);
        },
      });
    }
  }
}
