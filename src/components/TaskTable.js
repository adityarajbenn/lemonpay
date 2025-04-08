import { useEffect, useState } from "react";
import DropdownMenu from "./DropdownMenu";

function TaskTable({ tasks, onDeleteTask }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // adjust breakpoint if needed
    };
    handleResize(); // set on first render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    // Mobile view (Card layout)
    return (
      <div className="task-card-container">
        {tasks.map((task) => (
          <div className="task-card" key={task._id}>
            <div className="task-card-header">
              <h4>{task.taskName}</h4>
              <DropdownMenu task={task} onDelete={onDeleteTask} />
            </div>
            <p>{task.description}</p>
            <p>{new Date(task.dueDate).toLocaleString()}</p>
          </div>
        ))}
      </div>
    );
  }

  // Desktop view (Table layout)
  return (
    <div className="task-table">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Date & Time</th>
            <th>Task</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, i) => (
            <tr key={task._id}>
              <td>{i + 1}</td>
              <td>{new Date(task.dueDate).toLocaleString()}</td>
              <td>{task.taskName}</td>
              <td>{task.description}</td>
              <td>
                <DropdownMenu task={task} onDelete={onDeleteTask} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;
