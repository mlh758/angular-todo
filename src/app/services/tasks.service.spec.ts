import { TestBed } from '@angular/core/testing';

import { TasksService } from './tasks.service';
import { provideTestDbName } from './storage.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideTestDbName()],
    });
    service = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
