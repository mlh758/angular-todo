import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthedLayoutComponent } from './authed-layout.component';
import { ActivatedRoute } from '@angular/router';
import { UserSignal } from '../services/session.service';
import { mockUser } from '../services/users.service';
import { By } from '@angular/platform-browser';
import { Role } from '../services/storage.service';

const mockSesionService = jasmine.createSpyObj('SessionService', [
  'isImpersonating',
  'stopImpersonating',
]);

describe('AuthedLayoutComponent', () => {
  let component: AuthedLayoutComponent;
  let fixture: ComponentFixture<AuthedLayoutComponent>;
  let fakeSignal = jasmine.createSpy('fakeSignal');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthedLayoutComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
        {
          provide: UserSignal,
          useValue: fakeSignal,
        },
        {
          provide: 'SessionService',
          useValue: mockSesionService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthedLayoutComponent);
    component = fixture.componentInstance;
  });

  it('should not show the admin button if the user is not an admin', () => {
    fakeSignal.and.returnValue(mockUser);
    fixture.detectChanges();
    const links = fixture.debugElement.queryAll(By.css('a'));
    expect(
      links.some((link) => link.nativeElement.textContent === 'Admin')
    ).toBeFalse();
  });

  it('should show the admin button if the user is an admin', () => {
    fakeSignal.and.returnValue({
      ...mockUser,
      role: Role.ADMIN,
    });
    fixture.detectChanges();
    const links = fixture.debugElement.queryAll(By.css('a'));
    expect(
      links.some((link) => link.nativeElement.textContent === 'Admin')
    ).toBeTrue();
  });
});
