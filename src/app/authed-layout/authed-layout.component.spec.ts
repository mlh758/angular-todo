import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthedLayoutComponent } from './authed-layout.component';
import { ActivatedRoute } from '@angular/router';
import { UserSignal } from '../services/session.service';
import { mockUser } from '../services/users.service';

describe('AuthedLayoutComponent', () => {
  let component: AuthedLayoutComponent;
  let fixture: ComponentFixture<AuthedLayoutComponent>;

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
          useValue: () => mockUser,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
