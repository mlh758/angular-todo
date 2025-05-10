import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

import { LoginComponent } from './login.component';
import { provideTestDbName } from '../../services/storage.service';
import { mockUser, UsersService } from '../../services/users.service';
import { SessionService } from '../../services/session.service';
import { Directive, input } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

/**
 * You can mock components and directives in Angular tests by creating a
 * stub and using the `overrideComponent` method in the test bed.
 */
@Directive({
  selector: '[routerLink]',
  standalone: true,
})
export class MockRouterLinkDirective {
  routerLink = input();
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceMock: jasmine.SpyObj<UsersService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    userServiceMock = jasmine.createSpyObj('UsersService', ['find']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        provideTestDbName(),
        { provide: ActivatedRoute, useValue: {} },
        { provide: UsersService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    })
      .overrideComponent(LoginComponent, {
        remove: { imports: [RouterLink] },
        add: { imports: [MockRouterLinkDirective] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should redirect to tasks if already logged in', () => {
    const sessionService = TestBed.inject(SessionService);
    sessionService.establishSession(mockUser);
    fixture.detectChanges();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/auth/tasks']);
  });

  it('should establish a session on login', () => {
    userServiceMock.find.and.returnValue(of(mockUser));
    component.loginForm.setValue({ username: 'testuser' });
    routerMock.navigate.calls.reset();
    component.onSubmit();
    fixture.detectChanges();
    expect(userServiceMock.find).toHaveBeenCalledWith('testuser');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/auth/tasks']);
    expect(component.unableToFindUser()).toBeFalse();
  });

  it('should show an error if the user is not found', () => {
    userServiceMock.find.and.returnValue(of(undefined));
    component.loginForm.setValue({ username: 'invaliduser' });
    routerMock.navigate.calls.reset();
    component.onSubmit();
    fixture.detectChanges();
    expect(routerMock.navigate).not.toHaveBeenCalled();
    expect(component.unableToFindUser()).toBeTrue();
    const errorMessage = fixture.debugElement.query(By.css('strong'));
    expect(errorMessage.nativeElement.textContent).toContain('Unable to find');
  });
});
