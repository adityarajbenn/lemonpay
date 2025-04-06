import DropdownMenu from "./DropdownMenu";

function TaskTable({ tasks }) {
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
            <tr key={task.id}>
              <td>{i + 1}</td>
              <td>{task.dateTime}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                <DropdownMenu taskId={task.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;
