import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TopBarComponent } from '../components/top-bar/top-bar.component';
import { ButtonComponent } from '../components/button/button.component';
import { SessionService, UserSignal } from '../services/session.service';

@Component({
  selector: 'app-authed-layout',
  imports: [RouterOutlet, TopBarComponent, ButtonComponent, RouterLink],
  templateUrl: './authed-layout.component.html',
  styleUrl: './authed-layout.component.css',
})
export class AuthedLayoutComponent {
  user = inject(UserSignal);
  sessionService = inject(SessionService);

  isImpersonating(): boolean {
    return this.sessionService.isImpersonating();
  }

  stopImpersonating() {
    this.sessionService.stopImpersonating();
  }
}
