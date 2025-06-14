import React, { useState, useId, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskForm() {
  const [taskName, setTaskName] = useState("");
  const id = useId(); // making sure the label and input are connected
  const { addTask } = useContext(TaskContext); // getting the function to add tasks

  function handleSubmit(e) {
    e.preventDefault();
    if (taskName.trim() === "") return; // don't add empty tasks
    addTask(taskName); // add it to the list
    setTaskName(""); // clear the input
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={id}>New Task:</label>
      <input
        id={id}
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;