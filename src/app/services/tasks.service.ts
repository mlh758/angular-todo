import { inject, Injectable } from '@angular/core';
import { defaultIfEmpty, delay, filter, map, Observable, scan } from 'rxjs';
import { NewTask, StorageService, Store, Task } from './storage.service';

export { type Task, type NewTask } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  storageService = inject(StorageService);

  getTask(username: string, id: number) {
    return this.storageService.get(Store.TASKS, id).pipe(
      filter((task) => task?.user === username),
      delay(500)
    );
  }

  getTasks(username: string): Observable<Task[]> {
    return this.storageService.getUserTasks(username).pipe(
      delay(500),
      map((task) => [task]),
      defaultIfEmpty([]),
      scan((acc: Task[], task) => {
        return acc.concat(task);
      }, [])
    );
  }

  updateTask(task: Task): Observable<void> {
    return this.storageService.put(Store.TASKS, task).pipe(delay(500));
  }

  addTask(task: NewTask): Observable<void> {
    return this.storageService.add(Store.TASKS, task).pipe(delay(500));
  }
}
