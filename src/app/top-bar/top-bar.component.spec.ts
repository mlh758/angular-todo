import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarComponent } from './top-bar.component';
import { Component, TemplateRef, viewChild } from '@angular/core';

@Component({
  imports: [TopBarComponent],
  selector: 'top-bar-test',
  template: `
    <ng-template #testTemplate>
      <p>Test</p>
    </ng-template>
    <app-top-bar [actions]="testTemplate"></app-top-bar>
  `,
})
class WrapperComponent {
  testTemplate = viewChild.required('nameField', { read: TemplateRef });
}

describe('TopBarComponent', () => {
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBarComponent, WrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WrapperComponent);
  });

  it('should render the given template', () => {
    const componentRef = fixture.componentRef;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const templateContent = compiled.querySelector('p') as HTMLElement;
    expect(templateContent.textContent).toBe('Test');
  });
});
