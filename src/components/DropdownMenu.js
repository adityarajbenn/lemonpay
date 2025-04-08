import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DropdownMenu({ task, onDelete }) {
  const taskId = task?._id;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  const handleDelete = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("You are not logged in.");

    try {
      const res = await fetch(`https://lemonpaybackend.onrender.com/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Failed to delete task");

      alert("Task deleted successfully!");
      onDelete?.(taskId);  // Notify parent component to remove task
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="dropdown-wrapper">
      <button className="dots" onClick={toggle}>⋮</button>
      {open && (
        <div className="dropdown-menu">
          <button onClick={() => navigate("/add-task", {
            state: {
              taskId,
              taskName: task?.taskName,
              description: task?.description,
              dueDate: task?.dueDate
            }
          })}>
            Edit
          </button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
