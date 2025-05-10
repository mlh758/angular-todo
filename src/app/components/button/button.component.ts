import { booleanAttribute, Component, input, output } from '@angular/core';

type ButtonType = 'submit' | 'button' | 'reset';
type Variant = 'primary' | 'secondary';

/**
 * The newer angular.dev website doesn't seem to say much about how to make
 * components that support visual customization. The older angular.io site
 * has this to say: https://v17.angular.io/guide/component-styles#authoring-a-component-to-support-customization
 *
 * They recommend using CSS variables to allow specific customization points. Consuming
 * components can then override these variables in their own stylesheets.
 *
 * I've found this _generally_ works pretty well, but you may find yourself having
 * to use ViewEncapsulation.None sometimes.
 *
 * You can also provide a TypeScript API like is common in React. I've seen this bog down
 * performance in React. It's interesting to see that specifically warned against in this
 * Angular documentation.
 *
 * The Admin component uses the customizations on this component as a demonstration.
 *
 */
@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  disabled = input(false, { transform: booleanAttribute });
  variant = input<Variant>('primary');
  type = input<ButtonType>('button');
  onClick = output<MouseEvent>();

  handleClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.onClick.emit(event);
    }
  }
}
