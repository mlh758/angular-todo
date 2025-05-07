import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * You could just use ng-content here but I wanted to
 * demonstrate passing templates as inputs.
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
