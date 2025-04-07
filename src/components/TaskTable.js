import DropdownMenu from "./DropdownMenu";

function TaskTable({ tasks, onDeleteTask }) {
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
                <DropdownMenu
                  taskId={task._id}
                  onDelete={onDeleteTask}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;
