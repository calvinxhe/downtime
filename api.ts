import { ITask} from "./types/tasks";

const baseUrl = 'http://localhost:3001';

export const getAllTodos = async (): Promise<ITask[]> => {
  try {
    const res = await fetch(`${baseUrl}/tasks`, { cache: 'no-store' });

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Received non-JSON response");
    }

    const todos = await res.json();
    return todos;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const addTodo = async (todo: ITask): Promise<ITask> => {
  try {
    const res = await fetch(`${baseUrl}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    });

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Received non-JSON response");
    }

    const newTodo = await res.json();
    return newTodo;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error; // rethrow the error for caller to handle
  }
}


export const editTodo = async (todo: ITask): Promise<ITask> => {
  try {
    const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    });

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Received non-JSON response");
    }

    const updatedTodo = await res.json();
    return updatedTodo;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error; // rethrow the error for caller to handle
  }
}

export const deleteTodo = async (id: string): Promise<void> => {
  try {
    const res = await fetch(`${baseUrl}/tasks/${id}`, {
      method: 'DELETE',
    });

    const contentType = res.headers.get("content-type");
    if (contentType && !contentType.includes("application/json")) {
      throw new TypeError("Expected JSON response");
    }

    // Handle non-JSON responses here if needed
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error; // rethrow the error for caller to handle
  }
}
export const markTodoAsDone = async (id: string): Promise<ITask> => {
  try {
    // First, get the current task
    const currentTaskRes = await fetch(`${baseUrl}/tasks/${id}`);
    const currentTask = await currentTaskRes.json();

    // Update the isDone property
    const updatedTask = { ...currentTask, isDone: true };

    // Now, send the updated task back
    const updateRes = await fetch(`${baseUrl}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    });

    const contentType = updateRes.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Received non-JSON response");
    }

    const updatedTodo = await updateRes.json();
    return updatedTodo;
  } catch (error) {
    console.error("Error marking task as done:", error);
    throw error;
  }
};