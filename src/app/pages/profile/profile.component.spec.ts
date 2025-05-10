import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { SessionService, UserSignal } from '../../services/session.service';
import { mockUser, UsersService } from '../../services/users.service';
import { provideTestDbName, Role } from '../../services/storage.service';
import { of } from 'rxjs';

const mockUserService = jasmine.createSpyObj('UsersService', ['update']);
mockUserService.update.and.returnValue(of({ success: true })); // Emit a value

const mockSesionService = jasmine.createSpyObj('SessionService', [
  'establishSession',
]);
mockSesionService.establishSession.and.returnValue(of());

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    mockUserService.update.calls.reset();
    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [
        { provide: UserSignal, useValue: () => mockUser },
        provideTestDbName(),
        { provide: UsersService, useValue: mockUserService },
        { provide: SessionService, useValue: mockSesionService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the user and session on form submission', async () => {
    component.form.setValue({
      name: 'New Name',
      username: 'changedUserName',
      email: 'new@fake.com',
      role: Role.ADMIN,
    });
    expect(component.form.valid).toBeTrue();
    component.handleSubmit();
    expect(mockUserService.update).toHaveBeenCalledWith({
      name: 'New Name',
      username: mockUser.username,
      email: 'new@fake.com',
      role: Role.ADMIN,
    });
    expect(component.updating).toBeFalse();
    expect(component.updateError).toBeFalse();
    expect(mockSesionService.establishSession).toHaveBeenCalled();
  });
});
