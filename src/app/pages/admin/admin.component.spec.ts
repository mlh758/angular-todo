import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { AdminComponent } from './admin.component';
import { provideTestDbName } from '../../services/storage.service';
import { SessionService } from '../../services/session.service';
import { UsersService } from '../../services/users.service';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;
  let sessionServiceSpy: jasmine.SpyObj<SessionService>;

  beforeEach(async () => {
    usersServiceSpy = jasmine.createSpyObj('UsersService', ['find']);
    sessionServiceSpy = jasmine.createSpyObj('SessionService', ['impersonate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AdminComponent],
      providers: [
        provideTestDbName(),
        { provide: UsersService, useValue: usersServiceSpy },
        { provide: SessionService, useValue: sessionServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set error to "userNotFound" if user is not found', () => {
    usersServiceSpy.find.and.returnValue(of(undefined));
    component.form.setValue({ username: 'nonexistentUser' });

    component.handleSubmit();

    expect(component.error()).toBe('userNotFound');
    expect(component.submitting()).toBeFalse();
    expect(sessionServiceSpy.impersonate).not.toHaveBeenCalled();
  });

  it('should set error to "serverError" if user service fails', () => {
    usersServiceSpy.find.and.returnValue(
      throwError(() => new Error('Server error'))
    );
    component.form.setValue({ username: 'errorUser' });

    component.handleSubmit();

    expect(component.error()).toBe('serverError');
    expect(component.submitting()).toBeFalse();
    expect(sessionServiceSpy.impersonate).not.toHaveBeenCalled();
  });
});
