import { useState } from "react";
import TaskTable from "../components/TaskTable";
import "../styles/Task.css";
import { useNavigate } from "react-router-dom";

const mockTasks = [
  {
    id: 1,
    dateTime: "2/02/2024 2:00 PM",
    title: "Design Navaratri poster",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero.",
  },
  {
    id: 2,
    dateTime: "2/02/2024 2:00 PM",
    title: "Design Navaratri poster",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero.",
  },
  {
    id: 3,
    dateTime: "2/02/2024 2:00 PM",
    title: "Design Navaratri poster",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero.",
  },
  {
    id: 4,
    dateTime: "2/02/2024 2:00 PM",
    title: "Design Navaratri poster",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero.",
  },
  {
    id: 5,
    dateTime: "2/02/2024 2:00 PM",
    title: "Design Navaratri poster",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero.",
  },
  {
    id: 6,
    dateTime: "2/02/2024 2:00 PM",
    title: "Design Navaratri poster",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero.",
  },
];

function TaskPage() {
  const tasksPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(mockTasks.length / tasksPerPage);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = mockTasks.slice(indexOfFirstTask, indexOfLastTask);
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="task-page">
      <div className="task-header">
        <h2>Tasks Management</h2>
        <button className="add-task-btn" onClick={() => navigate("/add-task")}>
          <span>＋</span> Add Task
        </button>

      </div>

      <TaskTable tasks={currentTasks} />

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            {"<"}
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active-page" : ""}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            {">"}
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskPage;
