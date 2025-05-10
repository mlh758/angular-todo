import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, map, timeout } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { Role } from '../../services/storage.service';

const JobGroup = {
  title: [''],
  company: [''],
  startDate: [''],
  endDate: [''],
};

// United States address, TODO: demonstrate using another country
// to flex this field in the form
const USAddress = {
  street: [''],
  city: [''],
  state: [''],
  zip: [''],
};

type CountryOptions = 'US' | 'Canada' | 'UK' | 'Mexico';
const CountrySelect: [CountryOptions] = ['US'];

// A validator to check if the password and confirm password fields match
function passwordMatchValidator(formGroup: AbstractControl) {
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
}

/**
 * Going unnecessarily hard on the form here to demonstrate
 * performance on a large form. Most of the fields are just getting discarded
 */
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  userService = inject(UsersService);
  router = inject(Router);
  destroyRef = inject(DestroyRef);
  form = this.fb.nonNullable.group(
    {
      name: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      role: [Role.USER, Validators.required],
      password: ['', Validators.minLength(12)],
      confirmPassword: ['', Validators.minLength(12)],
      country: CountrySelect,
      address: this.fb.group(USAddress),
      workAddress: this.fb.group(USAddress),
      phoneNumbers: this.fb.nonNullable.array([
        this.fb.nonNullable.control(''),
        this.fb.nonNullable.control(''),
      ]),
      firstJob: this.fb.group(JobGroup),
      currentJob: this.fb.group(JobGroup),
      agreeToTerms: [false, Validators.requiredTrue],
      agreeToPrivacy: [false, Validators.requiredTrue],
      agreeToMarketing: [false],
      agreeToThirdParty: [false],
    },
    { validators: passwordMatchValidator }
  );

  // Being able to pipe events through observables is nice
  formError = toSignal(
    this.form.statusChanges.pipe(
      debounceTime(500),
      map((status) => status === 'INVALID')
    )
  );

  get phoneNumbers(): FormArray {
    return this.form.get('phoneNumbers') as FormArray;
  }

  get countries(): { label: string; value: CountryOptions }[] {
    return [
      { label: $localize`United States`, value: 'US' },
      { label: $localize`Canada`, value: 'Canada' },
      { label: $localize`United Kingdom`, value: 'UK' },
      { label: $localize`Mexico`, value: 'Mexico' },
    ];
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    const userData = this.form.value;
    // something like zod would be better here if we had more fields we cared about
    const user = {
      username: userData.username!,
      name: userData.name!,
      email: userData.email!,
      role: Role.USER,
    };
    if (!user.username || !user.name || !user.email) {
      return;
    }
    this.userService
      .create(user)
      .pipe(timeout(5000), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          console.log('User created successfully');
          this.router.navigate(['/auth/tasks']);
          this.form.reset();
        },
        error: (err) => {
          console.error('Error creating user:', err);
        },
      });
  }
}
