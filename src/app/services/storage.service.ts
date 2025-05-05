import { Injectable, InjectionToken, inject } from '@angular/core';
import { AsyncSubject, Observable } from 'rxjs';

export const DATABASE_NAME = new InjectionToken<string>('name of indexedDB');

export enum Store {
  TASKS = 'tasks',
  USERS = 'users',
}

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: Date;
  user: string;
}

export type NewTask = Omit<Task, 'id'>;

export interface User {
  username: string;
  name: string;
  email: string;
}

/**
 * Service to manage IndexedDB storage.
 * It's a little simplistic for the example, you probably wouldn't want to
 * define all your types in one file like this.
 *
 * Also there is a race on initDB connecting and the first add/get call.
 */
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _db: IDBDatabase | null = null;
  // Anyone that subscribes to this will get the database when it's ready
  private dbReadySubject = new AsyncSubject<IDBDatabase>();
  public dbReady$ = this.dbReadySubject.asObservable();
  private databaseName = inject(DATABASE_NAME);

  constructor() {
    this.initDB();
  }

  get db(): IDBDatabase {
    if (!this._db) {
      throw new Error('Database is not initialized');
    }
    return this._db;
  }

  private initDB(): void {
    const request = indexedDB.open(this.databaseName, 1);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains('tasks')) {
        const tasksStore = db.createObjectStore('tasks', {
          keyPath: 'id',
          autoIncrement: true,
        });
        tasksStore.createIndex('user', 'user', { unique: false });
      }

      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'username' });
      }
    };

    request.onsuccess = (event: Event) => {
      this._db = (event.target as IDBOpenDBRequest).result;
      this.dbReadySubject.next(this._db);
      this.dbReadySubject.complete();
    };

    request.onerror = (event: Event) => {
      console.error(
        'Database error:',
        (event.target as IDBOpenDBRequest).error
      );
    };
  }

  public add(storeName: Store.TASKS, value: NewTask): Observable<void>;
  public add(storeName: Store.USERS, value: User): Observable<void>;
  public add<T>(storeName: Store, value: T): Observable<void> {
    return new Observable((observer) => {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(value);

      request.onsuccess = () => {
        observer.next();
        observer.complete();
      };

      request.onerror = (event: Event) => {
        observer.error((event.target as IDBRequest).error);
      };
    });
  }

  public get(storeName: Store.TASKS, key: number): Observable<Task | undefined>;
  public get(storeName: Store.USERS, key: string): Observable<User | undefined>;
  public get<T, K extends keyof T & (string | number)>(
    storeName: Store,
    key: K
  ): Observable<T | undefined> {
    return new Observable((observer) => {
      const transaction = this.db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onsuccess = (event: Event) => {
        observer.next((event.target as IDBRequest).result as T | undefined);
        observer.complete();
      };

      request.onerror = (event: Event) => {
        observer.error((event.target as IDBRequest).error);
      };
    });
  }

  public getUserTasks(username: string): Observable<Task> {
    return new Observable((observer) => {
      const transaction = this.db.transaction(Store.TASKS, 'readonly');
      const store = transaction.objectStore(Store.TASKS);
      const index = store.index('user');
      const request = index.openCursor(username);
      let stopping = false;

      request.onsuccess = (event: Event) => {
        if (stopping) {
          return;
        }
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          observer.next(cursor.value as Task);
          cursor.continue();
        } else {
          observer.complete();
        }
      };

      request.onerror = (event: Event) => {
        observer.error((event.target as IDBRequest).error);
      };
      return () => {
        stopping = true;
      };
    });
  }
}
