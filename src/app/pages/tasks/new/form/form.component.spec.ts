import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { FormComponent } from './form.component';
import { TasksService } from '../../../../services/tasks.service';
import { User } from '../../../../services/storage.service';
import { UserSignal } from '../../../../services/session.service';

class MockTasksService {
  addTask = jasmine.createSpy('addTask').and.returnValue(of({}));
}

const mockUser: User = {
  username: 'testuser',
  name: 'Test User',
  email: 'test@test.com',
};

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let mockTasksService: MockTasksService;

  beforeEach(async () => {
    mockTasksService = new MockTasksService();

    await TestBed.configureTestingModule({
      imports: [FormComponent, ReactiveFormsModule],
      providers: [
        { provide: TasksService, useValue: mockTasksService },
        { provide: UserSignal, useValue: () => mockUser },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should disable the create task button initially and enable it after populating the form', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.disabled).toBeTrue();

    const titleInput = fixture.debugElement.query(
      By.css('#title')
    ).nativeElement;
    const descriptionInput = fixture.debugElement.query(
      By.css('#description')
    ).nativeElement;
    const dueDateInput = fixture.debugElement.query(
      By.css('#dueDate')
    ).nativeElement;

    titleInput.value = 'Test Task';
    titleInput.dispatchEvent(new Event('input'));

    descriptionInput.value = 'This is a test description';
    descriptionInput.dispatchEvent(new Event('input'));

    dueDateInput.value = '2025-05-10';
    dueDateInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(button.disabled).toBeFalse();
  });
});
