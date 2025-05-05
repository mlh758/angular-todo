import { Component, TemplateRef, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ButtonComponent, TopBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  actionsTemplate = viewChild.required('#actions', { read: TemplateRef });
}
