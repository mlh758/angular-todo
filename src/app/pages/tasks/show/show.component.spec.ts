import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ShowComponent } from './show.component';
import { Task, TasksService } from '../../../services/tasks.service';
import { By } from '@angular/platform-browser';
import { UserSignal } from '../../../services/session.service';
import { mockUser } from '../../../services/users.service';

const mockTask: Task = {
  user: 'testUser',
  id: 1,
  title: 'Test Task',
  description: 'This is a test task',
  completed: false,
  dueDate: new Date(),
};

describe('ShowComponent', () => {
  let component: ShowComponent;
  let fixture: ComponentFixture<ShowComponent>;
  let mockTasksService: any;

  beforeEach(async () => {
    mockTasksService = {
      getTask: jasmine
        .createSpy('getTask')
        .and.returnValues(of(mockTask), of({ ...mockTask, completed: true })),
      updateTask: jasmine
        .createSpy('updateTask')
        .and.returnValue(of({ ...mockTask, completed: true })),
    };

    await TestBed.configureTestingModule({
      imports: [ShowComponent],
      providers: [
        { provide: TasksService, useValue: mockTasksService },
        { provide: UserSignal, useValue: () => mockUser },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowComponent);
    fixture.componentRef.setInput('id', 1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display task details and allow completing the task', async () => {
    // Wait for the component to stabilize
    await fixture.whenStable();
    fixture.detectChanges();

    // Verify initial task details
    const titleElement = fixture.debugElement.query(
      By.css('dt:nth-child(1)')
    ).nativeElement;
    expect(titleElement.textContent).toContain('Title:');
    expect(
      fixture.debugElement.query(By.css('dd:nth-child(2)')).nativeElement
        .textContent
    ).toContain(mockTask.title);

    // Verify the complete button is present
    const completeButton = fixture.debugElement.query(By.css('app-button'));
    expect(completeButton).toBeTruthy();

    // Simulate clicking the complete button
    completeButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Verify the task is marked as completed
    expect(mockTasksService.updateTask).toHaveBeenCalledWith({
      ...mockTask,
      completed: true,
    });
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Completed');
  });
});
