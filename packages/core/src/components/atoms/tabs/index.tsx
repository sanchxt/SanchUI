import * as React from 'react';
import { cn } from '../../../utils/cn';

export interface TaskProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  completed: boolean;
  onToggleCompleted: () => void;
}

const Task = React.forwardRef<HTMLDivElement, TaskProps>(
  (
    { className, title, description, completed, onToggleCompleted, ...props },
    ref
  ) => {
    const id = React.useId(); // Generates a unique ID for accessibility

    return (
      <div
        className={cn(
          'flex items-center gap-3 p-4 border border-input rounded-md',
          completed && 'opacity-50',
          className
        )}
        ref={ref}
        {...props}
      >
        <input
          type="checkbox"
          id={id}
          checked={completed}
          onChange={onToggleCompleted}
          className="h-5 w-5"
        />
        <label htmlFor={id} className="flex flex-col cursor-pointer">
          <span className={cn('font-medium', completed && 'line-through')}>
            {title}
          </span>
          {description && (
            <span className="text-sm text-muted-foreground">{description}</span>
          )}
        </label>
      </div>
    );
  }
);

Task.displayName = 'Task';

export { Task };
