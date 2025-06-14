import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskList({ query }) {
  const { tasks, toggleComplete } = useContext(TaskContext);

  // filter tasks based on the search query
  const filteredTasks = tasks.filter(task =>
    task?.title?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ul>
      {filteredTasks.map((task) => (
        <li key={task.id}>
          <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {task.title}
          </span>
          {/* when the button is clicked, it toggles the complete status */}
          <button data-testid={task.id} onClick={() => toggleComplete(task.id)}>
            {task.completed ? "Undo" : "Complete"}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;