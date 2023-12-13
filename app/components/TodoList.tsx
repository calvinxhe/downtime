"use client"

import React from "react";
import { ITask } from "@/types/tasks";
import Task from "./Task";
import useStores from "@/zustand-store";
import { useEffect } from "react";

interface TodoListProps {
  tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ }) => {
  const fetchTasks = useStores((state) => state.fetchTasks);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const tasks = useStores((state) => state.tasks);
  return (
    <div className='flex items-start flex-grow-1 '>
      {/* Pagination Component */}
      <div className='flex flex-col items-center mr-4 pt-20'>
        {tasks.map((task, index) => (
          <div key={task.id} className='flex flex-col items-center'>
            <div className={`h-4 w-4 rounded-full mb-1 ${task.isDone ? 'bg-black' : 'bg-white'} border-2 border-black`}></div>
            {index < tasks.length - 1 && (
              <div className={`w-px h-8 mb-1 ${task.isDone ? 'bg-black' : 'bg-white'}`}></div>
            )}
          </div>
        ))}
      </div>

      {/* Task Table */}
      <div className='flex flex-grow overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th>Tasks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoList;