import { Component, input, TemplateRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

type Identifier<R> = (val: R) => string | number;

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent<R> {
  columns = input.required<string[]>();
  rows = input.required<R[]>();
  fields = input.required<(keyof R | TemplateRef<unknown>)[]>();
  rowId = input.required<Identifier<R>>();
  defaultTemplate = viewChild('defaultRow', { read: TemplateRef });

  getRowId(row: R): string | number {
    return this.rowId()(row);
  }

  renderRow(field: keyof R | TemplateRef<unknown>): TemplateRef<unknown> {
    if (field instanceof TemplateRef) {
      return field;
    }
    return this.defaultTemplate()!;
  }
}
