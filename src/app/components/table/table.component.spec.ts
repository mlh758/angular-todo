import { TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { Component, TemplateRef, viewChild } from '@angular/core';

type TestRow = {
  id: number;
  name: string;
};

const sampleRows: TestRow[] = [
  { id: 1, name: 'Row 1' },
  { id: 2, name: 'Row 2' },
];

const identifier: (row: TestRow) => string | number = (row: TestRow) => row.id;

@Component({
  imports: [TableComponent],
  selector: 'app-table-test',
  template: `
    <ng-template #nameField let-row="row">
      <td>{{ row.name }} From Template</td>
    </ng-template>
    <app-table
      [columns]="columns"
      [rows]="rows"
      [fields]="fields"
      [rowId]="rowId"
    ></app-table>
  `,
})
class WrapperComponent {
  columns = ['id', 'name'];
  rows = sampleRows;
  rowId = identifier;
  nameTemplate = viewChild.required('nameField', { read: TemplateRef });
  get fields() {
    return ['id', this.nameTemplate()];
  }
}

describe('TableComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent, WrapperComponent],
    }).compileComponents();
  });

  it('should render "Row 1" with default template', () => {
    const fixture = TestBed.createComponent(TableComponent<TestRow>);
    const componentRef = fixture.componentRef;
    componentRef.setInput('columns', ['id', 'name']);
    componentRef.setInput('rows', sampleRows);
    componentRef.setInput('fields', ['id', 'name']);
    componentRef.setInput('rowId', identifier);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('tbody tr td')?.textContent?.trim()).toBe(
      '1'
    );
    expect(
      compiled.querySelector('tbody tr td:nth-child(2)')?.textContent?.trim()
    ).toBe('Row 1');
  });

  it('should render a td with "Row 1 From Template"', () => {
    const fixture = TestBed.createComponent(WrapperComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('tbody tr td:nth-child(2)')?.textContent?.trim()
    ).toBe('Row 1 From Template');
  });
});
