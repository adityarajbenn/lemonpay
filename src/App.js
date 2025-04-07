import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddTask from "./pages/AddTask";
import { isAuthenticated } from "./utils/auth";
import TaskPage from "./pages/TaskPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tasks" element={isAuthenticated() ? <TaskPage /> : <Navigate to="/login" />} />
        <Route path="/add-task" element={isAuthenticated() ? <AddTask /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
