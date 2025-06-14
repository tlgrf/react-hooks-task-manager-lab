import React, { createContext, useState, useEffect } from "react";

// making a context so we can access task data from anywhere in the app
export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // fetch tasks from the backend when the app loads
  useEffect(() => {
    fetch("http://localhost:6001/tasks")
      .then((r) => r.json())
      .then((data) => setTasks(data));
  }, []);

  // funct that adds a new task and updates the backend
function addTask(title) {
  const tempId = Date.now(); // temporary unique ID
  const optimisticTask = {
    id: tempId,
    title,
    completed: false,
  };

  // immediately add the task to the UI (optimistic render)
  setTasks((prev) => [...prev, optimisticTask]);

  // send the real POST request
  fetch("http://localhost:6001/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, completed: false }),
  })
    .then((r) => r.json())
    .then((data) => {
      // replace the temporary task with the one returned from server
      setTasks((prev) =>
        prev.map((task) => (task.id === tempId ? data : task))
      );
    });
}
  // toggles if a task is completed or not
  function toggleComplete(id) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    // update the task on the backend too
    const updated = updatedTasks.find((t) => t.id === id);
    fetch(`http://localhost:6001/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: updated.completed }),
    });
  }

  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask, toggleComplete }}>
      {children}
    </TaskContext.Provider>
  );
}