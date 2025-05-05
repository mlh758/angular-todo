import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthedLayoutComponent } from './authed-layout.component';
import { ActivatedRoute } from '@angular/router';

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
