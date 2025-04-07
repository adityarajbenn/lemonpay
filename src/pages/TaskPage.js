import { useEffect, useState } from "react";
import TaskTable from "../components/TaskTable";
import "../styles/Task.css";
import { useNavigate } from "react-router-dom";

function TaskPage() {
  const navigate = useNavigate();
  const tasksPerPage = 5;
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const userId = localStorage.getItem("userId");

      // If not logged in, redirect
      if (!userId) return navigate("/login");

      try {
        const res = await fetch("http://localhost:5000/api/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.msg || "Failed to load tasks");

        setTasks(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTasks();
  }, [navigate]);

  const totalPages = Math.ceil(tasks.length / tasksPerPage);
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

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
          ＋ Add Task
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

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
