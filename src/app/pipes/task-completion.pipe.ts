import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'completionStatus',
})
export class TaskCompletionPipe implements PipeTransform {
  transform(completed: boolean): string {
    return completed
      ? $localize`:Indicates a task is complete:Yes`
      : $localize`:Indicates a task is not yet complete:No`;
  }
}
