import {
  Component,
  computed,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { TasksService } from '../../../services/tasks.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { UserSignal } from '../../../services/session.service';
import { DatePipe } from '@angular/common';
import { ButtonComponent } from '../../../components/button/button.component';
import { LoadingSpinnerComponent } from '../../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-show',
  imports: [DatePipe, ButtonComponent, LoadingSpinnerComponent],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css',
})
export class ShowComponent {
  tasksService = inject(TasksService);
  userSignal = inject(UserSignal);
  id = input.required({ transform: numberAttribute });
  taskRequest = rxResource({
    request: () => ({ user: this.userSignal().username, id: this.id() }),
    loader: ({ request }) =>
      this.tasksService.getTask(request.user, request.id),
  });

  completeTask() {
    const task = this.taskRequest.value();
    if (task) {
      this.tasksService
        .updateTask({ ...task, completed: true })
        .subscribe(() => {
          this.taskRequest.reload();
        });
    }
  }
}
