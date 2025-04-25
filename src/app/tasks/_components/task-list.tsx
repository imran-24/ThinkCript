"use client";
import React from 'react';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { TaskCard } from './task-card';

const TaskList: React.FC = () => {
    const { filteredTasks } = useSelector((state: RootState) => state.tasks);

  if (filteredTasks.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 bg-white rounded-lg shadow-sm">
        <p className="text-lg text-gray-500">No tasks found. Create a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;