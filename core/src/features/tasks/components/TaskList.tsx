import React from 'react';
import { Calendar, CheckSquare, AlertCircle } from 'lucide-react';
import {Task} from "../../../../../immigration-2/src/types/tasks";
import {Badge, Card} from "../../../components";

interface TaskListProps {
  tasks: Task[];
  onSelect: (task: Task) => void;
}

export function TaskList({ tasks, onSelect }: TaskListProps) {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'warning';
      case 'medium': return 'default';
      case 'low': return 'success';
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card
          key={task.id}
          className="hover:shadow-md cursor-pointer"
          onClick={() => onSelect(task)}
        >
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{task.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                </div>
                <Badge variant={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
              </div>
              
              {task.dueDate && (
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                  <Calendar size={14} />
                  <span>Due: {task.dueDate.toLocaleDateString()}</span>
                </div>
              )}

              <div className="mt-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckSquare size={14} />
                  <span>{task.checklist.filter(item => item.completed).length} / {task.checklist.length} completed</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}