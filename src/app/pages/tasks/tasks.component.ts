import { Component, inject } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { RouterLink } from '@angular/router';
import { UserSignal } from '../../services/session.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-tasks',
  imports: [RouterLink, DatePipe, LoadingSpinnerComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  tasksService = inject(TasksService);
  userSignal = inject(UserSignal);
  tasksResource = rxResource({
    request: () => this.userSignal().username,
    loader: ({ request }) => {
      return this.tasksService.getTasks(request);
    },
    defaultValue: [],
  });
}
