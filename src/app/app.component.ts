import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * AppComponent is referenced in the main.ts file and is used to bootstrap
 * the application.
 *
 * Using ViewEncapsulation.None allows the styles to be applied globally
 * which is handy here to apply some consistent styles to the entire app.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
