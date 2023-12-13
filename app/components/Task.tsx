"use client";

import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import useStores from "@/zustand-store";

interface TaskProps {
  task: ITask;
}

type DeleteProps = {
  id: string;
}
 
const Task: React.FC<{ task: ITask }> = ({ task }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const editTask = useStores((state) => state.editTask);
  const deleteTask = useStores((state) => state.deleteTask);
  const markTaskAsDone = useStores((state) => state.markTaskAsDone);

  const router = useRouter();

  const handleSubmitEditTodo = async () => {
    // Update the task
    editTask({ ...task, text: taskToEdit });
    setOpenModalEdit(false);
  };

  const handleDeleteTask = async(id:String) => {
    deleteTask(task.id);
    setOpenModalDeleted(false);
  };

  const handleDoneTask = async (id: string) => {
    await markTaskAsDone(id);
    // Instead of using a separate isDone state, use task.isDone
    // Assuming markTodoAsDone updates the task's isDone property in the global state
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td className='w-full'>{task.text}</td>
      <td className='flex gap-5'>
      <FaCheckCircle
          onClick={() => handleDoneTask(task.id)}
          cursor="pointer"
          className={task.isDone ? "text-green-500" : "text-gray-500"} // Use task.isDone directly
          size={25}
        />
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor='pointer'
          className='text-blue-500'
          size={25}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className='font-bold text-lg'>Edit task</h3>
            <div className='modal-action'>
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type='text'
                placeholder='Type here'
                className='input input-bordered w-full'
              />
              <button type='submit' className='btn'>
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          cursor='pointer'
          className='text-red-500'
          size={25}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className='text-lg'>
            Are you sure, you want to delete this task?
          </h3>
          <div className='modal-action'>
            <button onClick={() => handleDeleteTask(task.id)} className='btn'>
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
