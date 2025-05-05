import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-authed-layout',
  imports: [RouterOutlet, TopBarComponent, ButtonComponent, RouterLink],
  templateUrl: './authed-layout.component.html',
  styleUrl: './authed-layout.component.css',
})
export class AuthedLayoutComponent {}
