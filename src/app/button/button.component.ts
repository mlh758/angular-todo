import { NgClass } from '@angular/common';
import {
  booleanAttribute,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

type ButtonType = 'submit' | 'button' | 'reset';
type Variant = 'primary' | 'secondary';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  disabled = input(false, { transform: booleanAttribute });
  fullWidth = input(false, { transform: booleanAttribute });
  variant = input<Variant>('primary');
  type = input<ButtonType>('button');
  onClick = output<MouseEvent>();
  currentClasses = computed(() => ({
    secondary: this.variant() === 'secondary',
    fullWidth: this.fullWidth(),
  }));
  handleClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.onClick.emit(event);
    }
  }
}
