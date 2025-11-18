// import { TaskList } from '../components/tasks/TaskList';
import { mockTasks } from '../data/mockData';
import {TaskList} from "core/src/features/tasks";
import {Task} from "../types/tasks";

export function Tasks() {
  const handleSelectTask = (task: Task) => {
    console.log('Selected task:', task);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Tasks & Checklists</h1>
      <TaskList tasks={mockTasks} onSelect={handleSelectTask} />
    </div>
  );
}