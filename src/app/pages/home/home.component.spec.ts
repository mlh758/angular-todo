import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';
import { DATABASE_NAME } from '../../services/storage.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
        { provide: DATABASE_NAME, useValue: 'TestDatabase' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a login button', () => {
    const loginButton = fixture.debugElement.query(By.css('.button'));
    expect(loginButton).toBeTruthy();
    expect(loginButton.nativeElement.textContent).toContain('Login');
  });

  it('should have a link to tasks', () => {
    const tasksLink = fixture.debugElement.query(
      By.css('a[routerLink="/auth/tasks"]')
    );
    expect(tasksLink).toBeTruthy();
    expect(tasksLink.nativeElement.textContent).toContain('View Tasks');
  });
});
