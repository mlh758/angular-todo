import { Component, inject, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent implements OnInit {
  sessionService = inject(SessionService);
  router = inject(Router);

  ngOnInit(): void {
    this.sessionService.destroySession();
    this.router.navigate(['/']);
  }
}
