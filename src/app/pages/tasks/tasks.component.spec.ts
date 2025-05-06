import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import { provideTestDbName, User } from '../../services/storage.service';
import { UserSignal } from '../../services/session.service';
import { ActivatedRoute } from '@angular/router';

const mockUser: User = {
  username: 'testuser',
  name: 'Test User',
  email: 'test@test.com',
};

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksComponent],
      providers: [
        provideTestDbName(),
        { provide: UserSignal, useValue: () => mockUser },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
