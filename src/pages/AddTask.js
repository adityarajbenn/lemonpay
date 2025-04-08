import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Task.css";

function AddTask() {
  const location = useLocation();
  const navigate = useNavigate();

  const editMode = location.state?.taskId;
  const [task, setTask] = useState(location.state?.taskName || "");
  const [description, setDescription] = useState(location.state?.description || "");
  const [date, setDate] = useState(location.state?.dueDate?.slice(0, 16) || "");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!task || !description || !date) {
      setError("All fields are required.");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("You are not logged in.");
      return;
    }

    try {
      const url = editMode
        ? `https://lemonpaybackend.onrender.com/api/tasks/${location.state.taskId}`
        : `https://lemonpaybackend.onrender.com/api/tasks`;

      const method = editMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskName: task,
          description,
          dueDate: date,
          userId,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Failed to create task");

      navigate("/tasks");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{editMode ? "Edit Task" : "Add Task"}</h3>
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <input
            type="text"
            placeholder="Enter Task Name"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <div className="modal-actions">
            <button type="submit" className="btn-save">
              {editMode ? "Update" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/tasks")}
              className="btn-cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
