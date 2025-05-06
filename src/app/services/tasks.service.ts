import { inject, Injectable } from '@angular/core';
import { defaultIfEmpty, delay, filter, map, Observable, of, scan } from 'rxjs';
import { StorageService, Store, Task } from './storage.service';

export { type Task } from './storage.service';

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
      map((task) => [task]),
      defaultIfEmpty([]),
      delay(500),
      scan((acc: Task[], task) => {
        return acc.concat(task);
      }, [])
    );
  }
}
