import { Component, inject } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  tasksService = inject(TasksService);
  tasks$ = this.tasksService.getTasks();
}
