import { TaskCompletionPipe } from './task-completion.pipe';

describe('TaskCompletionPipe', () => {
  it('should return "Yes" for completed tasks', () => {
    const pipe = new TaskCompletionPipe();
    expect(pipe.transform(true)).toBe('Yes');
  });

  it('should return "No" for incomplete tasks', () => {
    const pipe = new TaskCompletionPipe();
    expect(pipe.transform(false)).toBe('No');
  });
});
