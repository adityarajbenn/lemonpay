import { useState } from "react";
import "../styles/Task.css";
import { useNavigate } from "react-router-dom";

function AddTask() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      const res = await fetch(`https://lemonpaybackend.onrender.com/api/tasks`, {
        method: "POST",
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

      navigate("/tasks"); // ✅ redirect after success
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Add Task</h3>
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
            <button type="submit" className="btn-save">Save</button>
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
