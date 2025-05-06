import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksService, NewTask } from '../../../../services/tasks.service';
import { UserSignal } from '../../../../services/session.service';
import { ButtonComponent } from '../../../../components/button/button.component';

@Component({
  selector: 'app-task',
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  fb = inject(FormBuilder);
  taskService = inject(TasksService);
  router = inject(Router);
  userSignal = inject(UserSignal);
  submitError = false;

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    dueDate: [''],
  });

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const newTask = {
      ...this.form.value,
      user: this.userSignal().username,
      completed: false,
    } as NewTask;
    this.taskService.addTask(newTask).subscribe({
      next: () => {
        this.router.navigate(['/auth/tasks']);
      },
      error: (err) => {
        console.error('Error creating task:', err);
        this.submitError = true;
      },
    });
  }
}
