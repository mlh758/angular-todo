import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

const mockTasks = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Description for Task 1',
    completed: false,
  },
  {
    id: 2,
    title: 'Task 2',
    description: 'Description for Task 2',
    completed: true,
  },
  {
    id: 3,
    title: 'Task 3',
    description: 'Description for Task 3',
    completed: false,
  },
];

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  getTasks() {
    return of(mockTasks).pipe(delay(500));
  }
  getTaskById(id: number) {
    const task = mockTasks.find((task) => task.id === id);
    return of(task);
  }
}
