import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TopBarComponent } from '../components/top-bar/top-bar.component';
import { ButtonComponent } from '../components/button/button.component';
import { SessionService, UserSignal } from '../services/session.service';

/**
 * This is a component that functions as a wrapper for all components under
 * the /auth route. It provides a top nav bar with some controls.
 *
 * router-outlet renders any components under this that are matched by the
 * router.
 */
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
