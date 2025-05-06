import { TestBed } from '@angular/core/testing';
import {
  StorageService,
  DATABASE_NAME,
  Store,
  provideTestDbName,
} from './storage.service';
import { toArray } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

describe('StorageService', () => {
  let service: StorageService;

  beforeAll(() => {
    TestBed.configureTestingModule({
      providers: [provideTestDbName()],
    });

    service = TestBed.inject(StorageService);
  });

  afterEach(async () => {
    // Clear the database after each test
    const db = service.db;
    const transaction = db.transaction([Store.TASKS, Store.USERS], 'readwrite');
    transaction.objectStore(Store.TASKS).clear();
    transaction.objectStore(Store.USERS).clear();
    await new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve(null);
      transaction.onerror = () => reject(transaction.error);
    });
  });

  it('should add a user and retrieve tasks for that user', async () => {
    const user = {
      username: 'testuser',
      email: 'testuser@example.com',
      name: 'Test User',
    };
    const tasks = [
      {
        title: 'Task 1',
        description: 'Description 1',
        completed: false,
        user: user.username,
      },
      {
        title: 'Task 2',
        description: 'Description 2',
        completed: true,
        user: user.username,
      },
    ];

    // Add the user
    await lastValueFrom(service.add(Store.USERS, user));

    // Add tasks for the user
    for (const task of tasks) {
      await lastValueFrom(service.add(Store.TASKS, task));
    }

    const retrievedTasks = await lastValueFrom(
      service.getUserTasks(user.username).pipe(toArray())
    );

    expect(retrievedTasks.length).toBe(2);
    expect(retrievedTasks).toEqual(
      jasmine.arrayContaining([
        jasmine.objectContaining(tasks[0]),
        jasmine.objectContaining(tasks[1]),
      ])
    );
  });
});
