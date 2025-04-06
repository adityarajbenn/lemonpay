import { useState } from "react";

function DropdownMenu({ taskId }) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <div className="dropdown-wrapper">
      <button className="dots" onClick={toggle}>⋮</button>
      {open && (
        <div className="dropdown-menu">
          <button onClick={() => alert("Edit " + taskId)}>Edit</button>
          <button onClick={() => alert("Delete " + taskId)}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
