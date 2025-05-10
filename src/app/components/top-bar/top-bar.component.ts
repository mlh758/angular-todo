import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * This component uses ng-content to display additional controls in the middle
 * part of the top bar. It also takes an actions template for any content to be
 * placed at the right side. You could also use two ng-content tags with selectors
 * for this but I wanted to demonstrate the use of ng-template and ng-container.
 */
@Component({
  selector: 'app-top-bar',
  imports: [NgOptimizedImage, NgTemplateOutlet, RouterLink],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
})
export class TopBarComponent {
  actions = input<TemplateRef<unknown> | null>(null);
}
